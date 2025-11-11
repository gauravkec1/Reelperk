/**
 * Marketing Automation Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');

/**
 * @swagger
 * /api/marketing/campaigns:
 *   get:
 *     summary: Get marketing campaigns
 *     tags: [Marketing]
 */
router.get('/campaigns', async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    // TODO: Implement campaigns table
    res.json({campaigns: []});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

