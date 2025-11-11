/**
 * Finance & Accounting Routes
 */

const express = require('express');
const router = express.Router();
const {query} = require('../../utils/database');
const {createAuditLog} = require('../../services/auditService');

/**
 * @swagger
 * /api/finance/expenses:
 *   get:
 *     summary: Get expenses
 *     tags: [Finance]
 */
router.get('/expenses', async (req, res) => {
  try {
    const {startDate, endDate, category, status} = req.query;
    const restaurantId = req.user.restaurant_id;

    let queryText = 'SELECT * FROM expenses WHERE restaurant_id = $1';
    const params = [restaurantId];

    if (startDate && endDate) {
      queryText += ` AND date BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(startDate, endDate);
    }

    if (category) {
      queryText += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (status) {
      queryText += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    queryText += ' ORDER BY date DESC LIMIT 100';

    const result = await query(queryText, params);
    res.json({expenses: result.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/finance/expenses:
 *   post:
 *     summary: Create expense
 *     tags: [Finance]
 */
router.post('/expenses', async (req, res) => {
  try {
    const {category, description, amount, date, vendorId} = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!category || !amount || !date) {
      return res.status(400).json({error: 'Category, amount, and date required'});
    }

    const result = await query(
      `INSERT INTO expenses 
       (restaurant_id, category, description, amount, date, vendor_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [restaurantId, category, description, amount, date, vendorId]
    );

    const expense = result.rows[0];

    await createAuditLog({
      userId: req.user.id,
      restaurantId,
      module: 'finance',
      action: 'create',
      entityType: 'Expense',
      entityId: expense.id,
      description: `Expense of ₹${amount} created`,
      newValue: expense,
    });

    res.status(201).json({expense});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/**
 * @swagger
 * /api/finance/profit-loss:
 *   get:
 *     summary: Get profit & loss report
 *     tags: [Finance]
 */
router.get('/profit-loss', async (req, res) => {
  try {
    const {startDate, endDate} = req.query;
    const restaurantId = req.user.restaurant_id;

    if (!startDate || !endDate) {
      return res.status(400).json({error: 'Start date and end date required'});
    }

    // Get total income
    const incomeResult = await query(
      `SELECT COALESCE(SUM(amount), 0) as total_income 
       FROM income 
       WHERE restaurant_id = $1 AND date BETWEEN $2 AND $3`,
      [restaurantId, startDate, endDate]
    );

    // Get total expenses
    const expenseResult = await query(
      `SELECT COALESCE(SUM(amount), 0) as total_expenses 
       FROM expenses 
       WHERE restaurant_id = $1 AND date BETWEEN $2 AND $3 AND status = 'approved'`,
      [restaurantId, startDate, endDate]
    );

    const totalIncome = parseFloat(incomeResult.rows[0].total_income);
    const totalExpenses = parseFloat(expenseResult.rows[0].total_expenses);
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

    res.json({
      period: {startDate, endDate},
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin: profitMargin.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;

