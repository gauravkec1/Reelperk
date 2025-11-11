/**
 * Menu Management Routes
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const {query} = require('../../utils/database');
const {createAuditLog} = require('../../services/auditService');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 5 * 1024 * 1024},
});

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get menu items
 *     tags: [Menu]
 */
router.get('/', async (req, res) => {
  try {
    const {category, available} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = 'SELECT * FROM menu_items WHERE restaurant_id = $1';
    const params = [restaurantId];

    if (category) {
      queryText += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (available !== undefined) {
      queryText += ` AND is_available = $${params.length + 1}`;
      params.push(available === 'true');
    }

    queryText += ' ORDER BY category, name';

    const result = await query(queryText, params);
    res.json({menuItems: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create menu item
 *     tags: [Menu]
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {name, description, price, category} = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!name || !price) {
      return res.status(400).json({error: 'Name and price required'});
    }

    // TODO: Upload image to S3/Firebase Storage
    const imageUrl = req.file ? `https://storage.reelperk.in/menu/${Date.now()}.jpg` : null;

    const result = await query(
      `INSERT INTO menu_items 
       (restaurant_id, name, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [restaurantId, name, description, price, category, imageUrl]
    );

    const menuItem = result.rows[0];

    await createAuditLog({
      userId: req.user.id,
      restaurantId,
      module: 'menu',
      action: 'create',
      entityType: 'MenuItem',
      entityId: menuItem.id,
      description: `Menu item "${name}" created`,
      newValue: menuItem,
    });

    res.status(201).json({menuItem});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

