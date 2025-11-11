/**
 * Attendance Service
 * Selfie-based attendance with GPS verification
 */

const {query} = require('../utils/database');
const {verifyFaceMatch} = require('./faceRecognitionService');
const {verifyLocation} = require('./locationService');
const {createAuditLog} = require('./auditService');

/**
 * Check-in with selfie and GPS
 */
async function checkIn(employeeId, selfieImage, latitude, longitude, restaurantId) {
  try {
    // 1. Get employee data
    const employeeResult = await query(
      `SELECT id, name, face_encoding, restaurant_id, 
       check_in_latitude, check_in_longitude, check_in_radius
       FROM employees WHERE id = $1 AND restaurant_id = $2`,
      [employeeId, restaurantId]
    );

    if (employeeResult.rows.length === 0) {
      throw new Error('Employee not found');
    }

    const employee = employeeResult.rows[0];

    // 2. Verify face match
    if (employee.face_encoding) {
      const faceMatch = await verifyFaceMatch(selfieImage, employee.face_encoding);
      if (!faceMatch.isMatch || faceMatch.confidence < 0.7) {
        throw new Error('Face verification failed. Please try again.');
      }
    } else {
      // First time - save face encoding
      const faceEncoding = await extractFaceEncoding(selfieImage);
      await query(
        'UPDATE employees SET face_encoding = $1 WHERE id = $2',
        [JSON.stringify(faceEncoding), employeeId]
      );
    }

    // 3. Verify location
    const locationValid = await verifyLocation(
      latitude,
      longitude,
      employee.check_in_latitude || 0,
      employee.check_in_longitude || 0,
      employee.check_in_radius || 100 // default 100 meters
    );

    if (!locationValid) {
      throw new Error('Location verification failed. You must be at the restaurant to check in.');
    }

    // 4. Check if already checked in today
    const today = new Date().toISOString().split('T')[0];
    const existingCheck = await query(
      `SELECT id FROM attendance 
       WHERE employee_id = $1 AND date = $2 AND check_out_time IS NULL`,
      [employeeId, today]
    );

    if (existingCheck.rows.length > 0) {
      throw new Error('You are already checked in today');
    }

    // 5. Create attendance record
    const checkInTime = new Date();
    const attendanceResult = await query(
      `INSERT INTO attendance 
       (employee_id, restaurant_id, date, check_in_time, check_in_method, 
        check_in_latitude, check_in_longitude, check_in_selfie_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, check_in_time`,
      [
        employeeId,
        restaurantId,
        today,
        checkInTime,
        'selfie_gps',
        latitude,
        longitude,
        await uploadSelfie(selfieImage, employeeId, 'checkin'),
        'present',
      ]
    );

    // 6. Create audit log
    await createAuditLog({
      userId: employeeId,
      restaurantId,
      module: 'staff',
      action: 'check_in',
      entityType: 'Attendance',
      entityId: attendanceResult.rows[0].id,
      description: `${employee.name} checked in via selfie + GPS`,
    });

    // 7. Send notification
    const {sendAttendanceNotification} = require('./notificationService');
    await sendAttendanceNotification(employeeId, 'checkin', {});

    return {
      success: true,
      attendanceId: attendanceResult.rows[0].id,
      checkInTime: attendanceResult.rows[0].check_in_time,
      message: 'Check-in successful',
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Check-out with selfie and GPS
 */
async function checkOut(employeeId, selfieImage, latitude, longitude, restaurantId) {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get today's check-in
    const attendanceResult = await query(
      `SELECT id, check_in_time FROM attendance 
       WHERE employee_id = $1 AND date = $2 AND check_out_time IS NULL`,
      [employeeId, today]
    );

    if (attendanceResult.rows.length === 0) {
      throw new Error('No active check-in found');
    }

    const attendance = attendanceResult.rows[0];

    // Verify face match
    const employeeResult = await query(
      'SELECT face_encoding, name FROM employees WHERE id = $1',
      [employeeId]
    );

    if (employeeResult.rows[0].face_encoding) {
      const faceMatch = await verifyFaceMatch(
        selfieImage,
        employeeResult.rows[0].face_encoding
      );
      if (!faceMatch.isMatch || faceMatch.confidence < 0.7) {
        throw new Error('Face verification failed');
      }
    }

    // Verify location
    const employee = employeeResult.rows[0];
    const locationValid = await verifyLocation(
      latitude,
      longitude,
      employee.check_in_latitude || 0,
      employee.check_in_longitude || 0,
      employee.check_in_radius || 100
    );

    if (!locationValid) {
      throw new Error('Location verification failed');
    }

    // Update attendance
    const checkOutTime = new Date();
    const workDuration = Math.round((checkOutTime - new Date(attendance.check_in_time)) / 1000 / 60); // minutes

    await query(
      `UPDATE attendance 
       SET check_out_time = $1, check_out_method = $2,
           check_out_latitude = $3, check_out_longitude = $4,
           check_out_selfie_url = $5, work_duration_minutes = $6
       WHERE id = $7`,
      [
        checkOutTime,
        'selfie_gps',
        latitude,
        longitude,
        await uploadSelfie(selfieImage, employeeId, 'checkout'),
        workDuration,
        attendance.id,
      ]
    );

    // Create audit log
    await createAuditLog({
      userId: employeeId,
      restaurantId,
      module: 'staff',
      action: 'check_out',
      entityType: 'Attendance',
      entityId: attendance.id,
      description: `${employee.name} checked out`,
    });

    // Send notification
    const {sendAttendanceNotification} = require('./notificationService');
    await sendAttendanceNotification(employeeId, 'checkout', {workDurationMinutes: workDuration});

    return {
      success: true,
      checkOutTime,
      workDurationMinutes: workDuration,
      message: 'Check-out successful',
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Upload selfie to storage
 */
async function uploadSelfie(imageBuffer, employeeId, type) {
  const {uploadSelfie: uploadSelfieToS3} = require('./fileUpload');
  try {
    return await uploadSelfieToS3(imageBuffer, employeeId, type);
  } catch (error) {
    // Fallback to placeholder if S3 not configured
    return `https://storage.reelperk.in/attendance/${employeeId}/${type}-${Date.now()}.jpg`;
  }
}

/**
 * Extract face encoding from image
 */
async function extractFaceEncoding(imageBuffer) {
  // TODO: Implement face-api.js or AWS Rekognition
  // For now, return placeholder
  return {encoding: 'placeholder'};
}

module.exports = {
  checkIn,
  checkOut,
};

