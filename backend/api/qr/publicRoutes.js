/**
 * Public QR Landing Page Routes
 * No authentication required
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');

/**
 * Dynamic landing page for QR code
 * GET /r/:qrId
 */
router.get('/:qrId', async (req, res) => {
  try {
    const {qrId} = req.params;

    // Get restaurant by QR code ID
    const restaurantResult = await query(
      `SELECT r.*, qc.static_url 
       FROM restaurants r
       JOIN qr_codes qc ON r.id = qc.restaurant_id
       WHERE r.qr_code_id = $1 OR qc.static_url LIKE $2`,
      [qrId, `%/${qrId}`]
    );

    if (restaurantResult.rows.length === 0) {
      return res.status(404).json({error: 'QR code not found'});
    }

    const restaurant = restaurantResult.rows[0];

    // Get latest media upload
    const mediaResult = await query(
      `SELECT * FROM media_uploads 
       WHERE restaurant_id = $1 AND is_active = true 
       ORDER BY created_at DESC LIMIT 1`,
      [restaurant.id]
    );

    // Get active rewards
    // TODO: Implement rewards table query

    res.json({
      restaurant: {
        name: restaurant.name,
        address: restaurant.address,
      },
      media: mediaResult.rows[0] || null,
      rewards: [], // TODO: Add rewards
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

