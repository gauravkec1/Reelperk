# 🎯 Preview App in Cursor - Complete Guide

## ⚡ Quick Start

### Option 1: Web Preview (Fastest)
```bash
npm run web
```
**Opens at:** http://localhost:3000

### Option 2: Full Stack Preview
```bash
npm run preview
```
- Web App: http://localhost:3000
- Backend API: http://localhost:5000

### Option 3: Double-Click Script
**Windows:** Double-click `CURSOR_PREVIEW.bat`

---

## 📱 Android Emulator Setup

### 1. Install Android Studio
- Download: https://developer.android.com/studio
- Install Android SDK and emulator

### 2. Create Virtual Device
1. Open Android Studio
2. Tools → Device Manager
3. Create Device → Pixel 5
4. System Image → API 33
5. Finish

### 3. Start Emulator
```bash
npm run emulator
```

### 4. Run App
```bash
npm run android
```

---

## 🌐 Web Console Preview

### Start Web Server
```bash
npm run web
```

### Access Points
- **App**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs
- **Health**: http://localhost:5000/health

### Features
✅ Full app in browser  
✅ Mobile-responsive  
✅ All features working  
✅ Real-time updates  
✅ Browser DevTools  

---

## 🎯 Preview in Cursor IDE

### Method 1: Terminal Preview
1. Open Terminal (Ctrl + `)
2. Run: `npm run web`
3. Click localhost link
4. Preview opens in browser

### Method 2: Debug Mode
1. Press **F5**
2. Select **"Debug Web"**
3. Browser opens with debugger
4. Set breakpoints in Cursor
5. Debug directly!

### Method 3: Preview Panel
- Cursor automatically detects localhost
- Click preview icon in terminal
- Opens in Cursor's preview panel

---

## 🔧 Cursor Debug Configurations

Available in `.vscode/launch.json`:

- **Debug Android** - Debug on Android emulator
- **Debug iOS** - Debug on iOS simulator  
- **Debug Web** - Debug in Chrome
- **Attach to Metro** - Attach to Metro bundler

### Quick Access
- **F5** - Start debugging
- **Ctrl+Shift+D** - Debug panel
- **Ctrl+`** - Terminal

---

## 📊 Preview Options Summary

| Method | Command | URL | Best For |
|--------|---------|-----|----------|
| Web Browser | `npm run web` | http://localhost:3000 | Fast preview |
| Full Stack | `npm run preview` | Web + API | Complete testing |
| Android | `npm run android` | Emulator | Native testing |
| iOS | `npm run ios` | Simulator | iOS testing |

---

## ✅ Quick Commands

```bash
# Web preview
npm run web

# Web + Backend
npm run preview

# Android emulator
npm run android

# iOS simulator
npm run ios
```

---

## 🎉 Ready to Preview!

**Start now:**
```bash
npm run web
```

Then open: **http://localhost:3000**

**Everything works in Cursor! 🚀**

