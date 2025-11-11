# 🚀 Run and Preview Your App

## ✅ Quick Start

### Option 1: Use Preview Script (Easiest)
```bash
# Double-click or run:
PREVIEW_APP.bat
```

This will:
- ✅ Start backend server
- ✅ Start Metro bundler  
- ✅ Open API documentation

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install  # First time only
npm run dev
```

**Terminal 2 - Metro:**
```bash
npm install  # First time only
npm start
```

**Terminal 3 - Run App:**
```bash
npm run android  # For Android
# OR
npm run ios      # For iOS (Mac only)
```

---

## 📱 Preview on Device

### Android
1. Start Android emulator OR connect physical device
2. Run: `npm run android`
3. App will install and launch automatically

### iOS (Mac only)
1. Start iOS simulator OR connect iPhone
2. Run: `npm run ios`
3. App will install and launch automatically

---

## 🌐 Preview Backend

Once backend is running:

- **Health Check**: http://localhost:5000/health
- **API Docs**: http://localhost:5000/api-docs
- **Test Login**: POST http://localhost:5000/api/auth/login

---

## ✅ What You'll See

1. **Login Screen** - Beautiful UI with email/password
2. **Dashboard** - Metrics, charts, quick actions
3. **Orders Tab** - Order management
4. **Menu Tab** - Menu items
5. **QR Tab** - QR code and engagement
6. **Settings Tab** - App settings

---

## 🎯 Test Features

- ✅ Login (use any email/password - mock auth)
- ✅ Navigate between tabs
- ✅ View dashboard metrics
- ✅ All screens load properly
- ✅ No crashes or errors

---

## 📊 Status Check

**Backend Running?**
- Check: http://localhost:5000/health
- Should return: `{"status":"ok"}`

**Metro Running?**
- Terminal should show: "Metro waiting on port 8081"

**App Running?**
- Device/emulator should show login screen

---

**Your app is ready to preview! 🎉**

