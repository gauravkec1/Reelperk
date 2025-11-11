/**
 * Authentication Routes
 * Login, Register, Token Refresh
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {query} = require('../../utils/database');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new restaurant owner
 *     tags: [Auth]
 */
router.post('/register', async (req, res) => {
  try {
    const {name, email, phone, password, restaurantName, restaurantAddress} = req.body;

    // Validate input
    if (!name || !email || !password || !restaurantName) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({error: 'Email already registered'});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create restaurant
    const restaurantResult = await query(
      `INSERT INTO restaurants (name, address, phone, email, is_active)
       VALUES ($1, $2, $3, $4, true)
       RETURNING id`,
      [restaurantName, restaurantAddress || '', phone || '', email]
    );

    const restaurantId = restaurantResult.rows[0].id;

    // Create user
    const userResult = await query(
      `INSERT INTO users (name, email, phone, password, role, restaurant_id, is_active)
       VALUES ($1, $2, $3, $4, 'owner', $5, true)
       RETURNING id, name, email, role, restaurant_id`,
      [name, email, phone || null, hashedPassword, restaurantId]
    );

    const user = userResult.rows[0];

    // Generate tokens
    const token = jwt.sign(
      {userId: user.id, restaurantId: user.restaurant_id},
      process.env.JWT_SECRET || 'your-secret-key',
      {expiresIn: '24h'}
    );

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurant_id,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({error: 'Registration failed'});
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({error: 'Email and password required'});
    }

    // Get user
    const result = await query(
      `SELECT u.id, u.name, u.email, u.password, u.role, u.restaurant_id, u.is_active,
              r.name as restaurant_name
       FROM users u
       LEFT JOIN restaurants r ON u.restaurant_id = r.id
       WHERE u.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({error: 'Account is inactive'});
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    // Generate token
    const token = jwt.sign(
      {userId: user.id, restaurantId: user.restaurant_id},
      process.env.JWT_SECRET || 'your-secret-key',
      {expiresIn: '24h'}
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurant_id,
        restaurantName: user.restaurant_name,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({error: 'Login failed'});
  }
});

module.exports = router;

