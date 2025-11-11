# 📱 Build APK Now - Complete Instructions

## 🚀 Quick Build (Windows)

### Option 1: Use Batch File
```bash
# Double-click or run:
BUILD_APK.bat
```

### Option 2: Manual Build
```bash
# 1. Navigate to android folder
cd android

# 2. Build release APK
gradlew assembleRelease

# 3. APK will be at:
# android/app/build/outputs/apk/release/app-release.apk
```

## 📋 Before Building

### 1. Generate Keystore (First Time)
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore reelperk-release-key.keystore -alias reelperk-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Gradle Properties
Edit `android/gradle.properties` and add:
```properties
REELPERK_RELEASE_STORE_FILE=reelperk-release-key.keystore
REELPERK_RELEASE_KEY_ALIAS=reelperk-key-alias
REELPERK_RELEASE_STORE_PASSWORD=your-password
REELPERK_RELEASE_KEY_PASSWORD=your-password
```

### 3. Set Android SDK Path
Create `android/local.properties`:
```properties
sdk.dir=C:/Users/YourName/AppData/Local/Android/Sdk
```

## 🎯 Build Commands

### Debug APK (Testing)
```bash
npm run build:android:debug
```

### Release APK (Production)
```bash
npm run build:android
```

### AAB for Play Store
```bash
npm run build:aab
```

## 📦 APK Location

After successful build:
```
android/app/build/outputs/apk/release/app-release.apk
```

## ✅ Verification

1. Check APK exists in output folder
2. Install on device: `adb install app-release.apk`
3. Test all features
4. Verify no crashes

---

**Your APK is ready to download and install! 📱**

