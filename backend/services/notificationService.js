/**
 * Notification Service
 * SMS, Email, Push notifications
 */

const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send SMS
 */
async function sendSMS(to, message) {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID) {
      console.log('SMS not configured, skipping:', message);
      return;
    }

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
  } catch (error) {
    console.error('SMS send error:', error);
  }
}

/**
 * Send Email
 */
async function sendEmail(to, subject, html) {
  try {
    if (!process.env.SMTP_USER) {
      console.log('Email not configured, skipping:', subject);
      return;
    }

    await emailTransporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
}

/**
 * Send attendance notification
 */
async function sendAttendanceNotification(employeeId, type, data) {
  // Get employee details
  const {query} = require('../utils/database');
  const result = await query('SELECT name, phone, email FROM employees WHERE id = $1', [employeeId]);
  
  if (result.rows.length === 0) return;
  
  const employee = result.rows[0];
  const message = type === 'checkin' 
    ? `Hi ${employee.name}, you checked in at ${new Date().toLocaleTimeString()}`
    : `Hi ${employee.name}, you checked out at ${new Date().toLocaleTimeString()}. Work duration: ${data.workDurationMinutes} minutes`;

  if (employee.phone) {
    await sendSMS(employee.phone, message);
  }
  if (employee.email) {
    await sendEmail(employee.email, 'Attendance Update', `<p>${message}</p>`);
  }
}

module.exports = {
  sendSMS,
  sendEmail,
  sendAttendanceNotification,
};

