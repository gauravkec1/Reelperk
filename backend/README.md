# ReelPerk ERP Backend

Complete production-ready backend API for ReelPerk ERP system.

## Features

- ✅ RESTful API with Express.js
- ✅ PostgreSQL database
- ✅ JWT authentication
- ✅ Selfie-based attendance with GPS verification
- ✅ Face recognition integration
- ✅ Real-time updates with Socket.io
- ✅ File upload handling
- ✅ Audit logging
- ✅ Swagger API documentation
- ✅ Error handling & logging
- ✅ Security middleware (Helmet, CORS, Rate limiting)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Set up PostgreSQL database:
```bash
createdb reelperk_erp
```

4. Run migrations:
```bash
npm run migrate
```

5. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Documentation

Once server is running, visit:
- Swagger UI: http://localhost:5000/api-docs
- Health Check: http://localhost:5000/health

## Key Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Staff & Attendance
- `POST /api/staff/attendance/checkin` - Check-in with selfie + GPS
- `POST /api/staff/attendance/checkout` - Check-out with selfie + GPS
- `GET /api/staff/attendance` - Get attendance records
- `POST /api/staff/leave` - Apply for leave

### Orders
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

### Finance
- `GET /api/finance/expenses` - Get expenses
- `POST /api/finance/expenses` - Create expense
- `GET /api/finance/profit-loss` - Get P&L report

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Configure proper CORS origins
4. Set up SSL/HTTPS
5. Use process manager (PM2)
6. Configure database connection pooling
7. Set up monitoring and logging

## Security

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation
- SQL injection prevention (parameterized queries)

