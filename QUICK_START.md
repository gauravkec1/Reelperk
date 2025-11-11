# ⚡ Quick Start - Get Running in 10 Minutes

## 🚀 Start Backend

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Start server
npm run dev
```

Backend will run on: http://localhost:5000

## 📱 Start Mobile App

```bash
# 1. Install dependencies (from root)
npm install

# 2. Start Metro bundler
npm start

# 3. Run on device (in new terminal)
npm run ios      # For iOS
npm run android  # For Android
```

## 🗄️ Set Up Database

```bash
# Create database
createdb reelperk_erp

# Run migrations
psql -U postgres -d reelperk_erp -f database/migrations/001_initial_schema.sql

# Load sample data (optional)
psql -U postgres -d reelperk_erp -f database/seeds/001_sample_data.sql
```

## ✅ Verify

1. **Backend Health**: http://localhost:5000/health
2. **API Docs**: http://localhost:5000/api-docs
3. **Mobile App**: Should show login screen

---

**That's it! Your app is running! 🎉**
