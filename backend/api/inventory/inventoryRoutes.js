/**
 * Inventory Management Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get inventory items
 *     tags: [Inventory]
 */
router.get('/', async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    const result = await query(
      'SELECT * FROM inventory_items WHERE restaurant_id = $1 ORDER BY name',
      [restaurantId]
    );
    res.json({items: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

