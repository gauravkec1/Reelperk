/**
 * Audit & Compliance Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');
const {authorize} = require('../../middleware/auth');

/**
 * @swagger
 * /api/audit/logs:
 *   get:
 *     summary: Get audit logs
 *     tags: [Audit]
 */
router.get('/logs', authorize('admin', 'manager'), async (req, res) => {
  try {
    const {startDate, endDate, module, action} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = 'SELECT * FROM audit_logs WHERE restaurant_id = $1';
    const params = [restaurantId];

    if (startDate && endDate) {
      queryText += ` AND timestamp BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(startDate, endDate);
    }

    if (module) {
      queryText += ` AND module = $${params.length + 1}`;
      params.push(module);
    }

    if (action) {
      queryText += ` AND action = $${params.length + 1}`;
      params.push(action);
    }

    queryText += ' ORDER BY timestamp DESC LIMIT 500';

    const result = await query(queryText, params);
    res.json({logs: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

