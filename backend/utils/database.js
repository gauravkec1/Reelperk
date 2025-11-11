/**
 * Database Connection and Initialization
 * PostgreSQL connection pool
 */

const {Pool} = require('pg');
const fs = require('fs').promises;
const path = require('path');

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'reelperk_erp',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connected');
});

pool.on('error', (err) => {
  console.error('❌ Database error:', err);
});

/**
 * Initialize database - run migrations
 */
async function initializeDatabase() {
  try {
    // Check connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection verified');

    // Run migrations
    const migrationsDir = path.join(__dirname, '../database/migrations');
    try {
      const files = await fs.readdir(migrationsDir);
      const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();

      for (const file of sqlFiles) {
        const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
        await pool.query(sql);
        console.log(`✅ Migration applied: ${file}`);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      console.log('⚠️  No migrations directory found');
    }

    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

/**
 * Execute query
 */
async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', {text, duration, rows: res.rowCount});
    }
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

/**
 * Get client for transactions
 */
async function getClient() {
  return await pool.connect();
}

module.exports = {
  pool,
  query,
  getClient,
  initializeDatabase,
};

