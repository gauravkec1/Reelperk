/**
 * Staff & HR Management Routes
 * Includes selfie-based attendance with GPS
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {checkIn, checkOut} = require('../../services/attendanceService');
const {query} = require('../../utils/database');
const {authorize} = require('../../middleware/auth');

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 5 * 1024 * 1024}, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

/**
 * @swagger
 * /api/staff/attendance/checkin:
 *   post:
 *     summary: Check-in with selfie and GPS
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - selfie
 *               - latitude
 *               - longitude
 *             properties:
 *               selfie:
 *                 type: string
 *                 format: binary
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 */
router.post('/attendance/checkin', upload.single('selfie'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'Selfie image is required'});
    }

    const {latitude, longitude} = req.body;
    const employeeId = req.user.id;
    const restaurantId = req.user.restaurant_id;

    if (!latitude || !longitude) {
      return res.status(400).json({error: 'Latitude and longitude are required'});
    }

    const result = await checkIn(
      employeeId,
      req.file.buffer,
      parseFloat(latitude),
      parseFloat(longitude),
      restaurantId
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/staff/attendance/checkout:
 *   post:
 *     summary: Check-out with selfie and GPS
 *     tags: [Staff]
 */
router.post('/attendance/checkout', upload.single('selfie'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'Selfie image is required'});
    }

    const {latitude, longitude} = req.body;
    const employeeId = req.user.id;
    const restaurantId = req.user.restaurant_id;

    const result = await checkOut(
      employeeId,
      req.file.buffer,
      parseFloat(latitude),
      parseFloat(longitude),
      restaurantId
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/staff/attendance:
 *   get:
 *     summary: Get attendance records
 *     tags: [Staff]
 */
router.get('/attendance', async (req, res) => {
  try {
    const {startDate, endDate, employeeId} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = `
      SELECT a.*, e.name as employee_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.restaurant_id = $1
    `;
    const params = [restaurantId];

    if (employeeId) {
      queryText += ' AND a.employee_id = $2';
      params.push(employeeId);
    }

    if (startDate && endDate) {
      queryText += ` AND a.date BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(startDate, endDate);
    }

    queryText += ' ORDER BY a.date DESC, a.check_in_time DESC LIMIT 100';

    const result = await query(queryText, params);
    res.json({attendance: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/staff/leave:
 *   post:
 *     summary: Apply for leave
 *     tags: [Staff]
 */
router.post('/leave', async (req, res) => {
  try {
    const {startDate, endDate, type, reason} = req.body;
    const employeeId = req.user.id;
    const restaurantId = req.user.restaurant_id;

    const result = await query(
      `INSERT INTO leave_requests 
       (employee_id, restaurant_id, start_date, end_date, type, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [employeeId, restaurantId, startDate, endDate, type, reason]
    );

    res.json({leaveRequest: result.rows[0]});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/staff/leave:
 *   get:
 *     summary: Get leave requests
 *     tags: [Staff]
 */
router.get('/leave', async (req, res) => {
  try {
    const employeeId = req.user.id;
    const restaurantId = req.user.restaurant_id;

    const result = await query(
      `SELECT * FROM leave_requests 
       WHERE restaurant_id = $1 
       ${req.user.role === 'admin' || req.user.role === 'manager' ? '' : 'AND employee_id = $2'}
       ORDER BY created_at DESC`,
      req.user.role === 'admin' || req.user.role === 'manager'
        ? [restaurantId]
        : [restaurantId, employeeId]
    );

    res.json({leaveRequests: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

