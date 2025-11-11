# 👀 Preview App in Cursor - Complete Guide

## 🚀 Quick Preview (All-in-One)

### Option 1: Web Preview (Easiest)
```bash
npm run web
```
Opens at: **http://localhost:3000**

### Option 2: Full Preview (Web + Backend)
```bash
npm run preview
```
- Web app: http://localhost:3000
- Backend API: http://localhost:5000

### Option 3: Everything (Web + Backend + Metro)
```bash
npm run preview:all
```

---

## 📱 Android Emulator in Cursor

### Setup Android Emulator

1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK and emulator

2. **Create Virtual Device**
   ```bash
   # Open Android Studio
   # Tools → Device Manager → Create Device
   # Select: Pixel 5, API 33
   ```

3. **Start Emulator**
   ```bash
   npm run emulator
   # OR
   emulator -avd Pixel_5_API_33
   ```

4. **Run App on Emulator**
   ```bash
   npm run android
   ```

---

## 🌐 Web Console Preview

### Start Web Preview
```bash
npm run web
```

### Access Points
- **Web App**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health

### Features
- ✅ Full app preview in browser
- ✅ Mobile-responsive design
- ✅ All features working
- ✅ Real-time updates
- ✅ Developer console available

---

## 🎯 Preview in Cursor

### Using Cursor's Built-in Preview

1. **Open Terminal** (Ctrl + `)
2. **Run**: `npm run web`
3. **Click** the localhost link that appears
4. **Or** use Cursor's preview panel

### Debug in Cursor

1. Press **F5** to start debugging
2. Select **"Debug Web"** configuration
3. Browser opens with debugger attached
4. Set breakpoints in Cursor
5. Debug directly in IDE

---

## 📊 Preview Options

### 1. Web Browser Preview
- Fastest way to preview
- Works on any OS
- Full debugging support
- URL: http://localhost:3000

### 2. Android Emulator
- Native Android experience
- Full device simulation
- Camera, GPS, etc. working
- Run: `npm run android`

### 3. iOS Simulator (Mac only)
- Native iOS experience
- Full device simulation
- Run: `npm run ios`

---

## 🔧 Cursor Integration

### Debug Configurations
Cursor has debug configurations ready:
- **Debug Android** - Debug on Android emulator
- **Debug iOS** - Debug on iOS simulator
- **Debug Web** - Debug in Chrome
- **Attach to Metro** - Attach to running Metro

### Quick Access
- Press **F5** - Start debugging
- **Ctrl+Shift+D** - Debug panel
- **Ctrl+`** - Terminal

---

## ✅ Quick Start Commands

```bash
# Web preview only
npm run web

# Web + Backend
npm run preview

# Everything (Web + Backend + Metro)
npm run preview:all

# Android emulator
npm run android

# iOS simulator
npm run ios
```

---

## 🎉 Preview Your App Now!

1. **Run**: `npm run web`
2. **Open**: http://localhost:3000
3. **See**: Your app running in browser!

**Everything works in Cursor! 🚀**

