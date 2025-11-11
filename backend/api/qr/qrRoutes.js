/**
 * QR & Engagement Routes
 */

const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const {query} = require('../../utils/database');
const ENV = require('../../config/env');

/**
 * @swagger
 * /api/qr/generate:
 *   post:
 *     summary: Generate QR code for restaurant
 *     tags: [QR]
 */
router.post('/generate', async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;

    // Check if QR already exists
    const existingResult = await query(
      'SELECT * FROM qr_codes WHERE restaurant_id = $1',
      [restaurantId]
    );

    if (existingResult.rows.length > 0) {
      return res.json({qrCode: existingResult.rows[0]});
    }

    // Generate static URL
    const qrId = `R${restaurantId.toString().replace(/-/g, '').substring(0, 10)}`;
    const staticUrl = `${process.env.QR_BASE_URL || 'https://reelperk.in/r'}/${qrId}`;

    // Generate QR code image
    const qrImage = await QRCode.toDataURL(staticUrl);

    // Save to database
    const result = await query(
      `INSERT INTO qr_codes (restaurant_id, qr_url, static_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [restaurantId, staticUrl, staticUrl]
    );

    // Update restaurant with QR code ID
    await query(
      'UPDATE restaurants SET qr_code_id = $1 WHERE id = $2',
      [qrId, restaurantId]
    );

    res.json({
      qrCode: result.rows[0],
      qrImage,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/qr/media:
 *   post:
 *     summary: Upload media (reel, photo, story)
 *     tags: [QR]
 */
router.post('/media', async (req, res) => {
  try {
    const {type, url, caption, hashtags} = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!type || !url) {
      return res.status(400).json({error: 'Type and URL required'});
    }

    const result = await query(
      `INSERT INTO media_uploads 
       (restaurant_id, type, url, caption, hashtags)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [restaurantId, type, url, caption, hashtags || []]
    );

    res.status(201).json({media: result.rows[0]});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

