/**
 * CRM & Customer Management Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');

/**
 * @swagger
 * /api/crm/customers:
 *   get:
 *     summary: Get customers
 *     tags: [CRM]
 */
router.get('/customers', async (req, res) => {
  try {
    const {search, segment} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = 'SELECT * FROM customers WHERE restaurant_id = $1';
    const params = [restaurantId];

    if (search) {
      queryText += ` AND (name ILIKE $${params.length + 1} OR phone ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    if (segment) {
      queryText += ` AND customer_segment = $${params.length + 1}`;
      params.push(segment);
    }

    queryText += ' ORDER BY total_spent DESC LIMIT 100';

    const result = await query(queryText, params);
    res.json({customers: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

