/**
 * Order Management Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');
const {createAuditLog} = require('../../services/auditService');
const {emitOrderUpdate} = require('../../services/socketService');
const {v4: uuidv4} = require('uuid');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     tags: [Orders]
 */
router.get('/', async (req, res) => {
  try {
    const {status, startDate, endDate, type} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = 'SELECT * FROM orders WHERE restaurant_id = $1';
    const params = [restaurantId];

    if (status) {
      queryText += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    if (type) {
      queryText += ` AND type = $${params.length + 1}`;
      params.push(type);
    }

    if (startDate && endDate) {
      queryText += ` AND created_at BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(startDate, endDate);
    }

    queryText += ' ORDER BY created_at DESC LIMIT 100';

    const result = await query(queryText, params);
    res.json({orders: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 */
router.post('/', async (req, res) => {
  try {
    const {type, tableNumber, items, customerName, customerPhone, specialInstructions} = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!items || items.length === 0) {
      return res.status(400).json({error: 'Order items required'});
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }

    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order
    const result = await query(
      `INSERT INTO orders 
       (restaurant_id, order_number, type, table_number, customer_name, customer_phone,
        items, subtotal, tax, total, created_by, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        restaurantId,
        orderNumber,
        type || 'dine_in',
        tableNumber,
        customerName,
        customerPhone,
        JSON.stringify(items),
        subtotal,
        tax,
        total,
        req.user.id,
        'pending',
      ]
    );

    const order = result.rows[0];

    // Create audit log
    await createAuditLog({
      userId: req.user.id,
      restaurantId,
      module: 'orders',
      action: 'create',
      entityType: 'Order',
      entityId: order.id,
      description: `Order ${orderNumber} created`,
      newValue: order,
    });

    // Emit real-time update
    emitOrderUpdate(restaurantId, order);

    res.status(201).json({order});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/orders/:id:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 */
router.put('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const restaurantId = req.user.restaurant_id;

    // Get old order
    const oldOrderResult = await query(
      'SELECT * FROM orders WHERE id = $1 AND restaurant_id = $2',
      [id, restaurantId]
    );

    if (oldOrderResult.rows.length === 0) {
      return res.status(404).json({error: 'Order not found'});
    }

    const oldOrder = oldOrderResult.rows[0];

    // Update order
    const result = await query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    const newOrder = result.rows[0];

    // Create audit log
    await createAuditLog({
      userId: req.user.id,
      restaurantId,
      module: 'orders',
      action: 'update',
      entityType: 'Order',
      entityId: id,
      description: `Order status changed to ${status}`,
      oldValue: oldOrder,
      newValue: newOrder,
    });

    // Emit real-time update
    emitOrderUpdate(restaurantId, newOrder);

    res.json({order: newOrder});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

