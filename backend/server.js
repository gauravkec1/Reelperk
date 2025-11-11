/**
 * ReelPerk ERP - Main Server
 * Production-ready Express.js server with all modules
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Import routes
const authRoutes = require('./api/auth/authRoutes');
const staffRoutes = require('./api/staff/staffRoutes');
const orderRoutes = require('./api/orders/orderRoutes');
const menuRoutes = require('./api/menu/menuRoutes');
const financeRoutes = require('./api/finance/financeRoutes');
const inventoryRoutes = require('./api/inventory/inventoryRoutes');
const qrRoutes = require('./api/qr/qrRoutes');
const marketingRoutes = require('./api/marketing/marketingRoutes');
const auditRoutes = require('./api/audit/auditRoutes');
const crmRoutes = require('./api/crm/crmRoutes');

// Import middleware
const {errorHandler} = require('./middleware/errorHandler');
const {authenticateToken} = require('./middleware/auth');
const {logRequest} = require('./middleware/logger');

// Import services
const socketService = require('./services/socketService');
const {initializeDatabase} = require('./utils/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
  },
});

// Initialize Socket.io
socketService.initialize(io);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ReelPerk ERP API',
      version: '1.0.0',
      description: 'Complete ERP and Customer Engagement API',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./api/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Request logging
app.use(logRequest);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/staff', authenticateToken, staffRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/menu', authenticateToken, menuRoutes);
app.use('/api/finance', authenticateToken, financeRoutes);
app.use('/api/inventory', authenticateToken, inventoryRoutes);
app.use('/api/qr', authenticateToken, qrRoutes);
app.use('/api/marketing', authenticateToken, marketingRoutes);
app.use('/api/audit', authenticateToken, auditRoutes);
app.use('/api/crm', authenticateToken, crmRoutes);

// Public QR landing page route (no auth required)
app.use('/r', require('./api/qr/publicRoutes'));

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({error: 'Route not found'});
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

initializeDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 ReelPerk ERP Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  });

module.exports = {app, server, io};

