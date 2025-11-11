# 🚀 Quick Deployment Guide

## Backend Setup (5 minutes)

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Set up database
createdb reelperk_erp
psql -U postgres -d reelperk_erp -f ../database/migrations/001_initial_schema.sql

# 4. Run seed data (optional)
psql -U postgres -d reelperk_erp -f ../database/seeds/001_sample_data.sql

# 5. Start server
npm run dev
```

## Mobile App Setup (3 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start Metro
npm start

# 3. Run on device
npm run ios    # or npm run android
```

## Docker Setup (2 minutes)

```bash
docker-compose up -d
```

## Test API

```bash
# Health check
curl http://localhost:5000/health

# API docs
open http://localhost:5000/api-docs
```

## Default Test Credentials

- Email: `owner@reelperk.in`
- Password: `password123` (change in production!)

---

**That's it! Your app is running! 🎉**

