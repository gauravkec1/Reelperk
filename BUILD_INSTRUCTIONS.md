# 🏗️ Build Instructions for iOS & Android

Complete guide to build and deploy ReelPerk ERP to App Store and Play Store.

---

## 📱 iOS Build Instructions

### Prerequisites

1. **macOS** (required for iOS development)
2. **Xcode** 14.0 or later
3. **CocoaPods** installed: `sudo gem install cocoapods`
4. **Apple Developer Account** ($99/year)

### Step 1: Install Dependencies

```bash
# Install npm dependencies
npm install

# Install iOS pods
cd ios
pod install
cd ..
```

### Step 2: Configure Xcode Project

1. Open `ios/ReelPerk.xcworkspace` (NOT `.xcodeproj`) in Xcode
2. Select the **ReelPerk** project in the navigator
3. Go to **Signing & Capabilities** tab
4. Select your **Team** (Apple Developer account)
5. Update **Bundle Identifier** if needed (e.g., `com.yourcompany.reelperk`)
6. Ensure **Automatically manage signing** is checked

### Step 3: Update App Information

Edit `app.json`:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.reelperk.erp",
      "buildNumber": "1.0.0"
    }
  }
}
```

Update `ios/ReelPerk/Info.plist`:
- App name
- Version number
- Build number

### Step 4: Add App Icons and Splash Screen

1. **App Icon**: 
   - Place `icon.png` (1024x1024) in `src/assets/images/`
   - Or use Xcode's Asset Catalog

2. **Splash Screen**:
   - Place `splash.png` in `src/assets/images/`
   - Configured in `app.json`

### Step 5: Build for Testing (Development)

```bash
# Run on simulator
npm run ios

# Or build for device
npm run ios -- --device
```

### Step 6: Build Archive for App Store

#### Option A: Using Xcode (Recommended)

1. Open `ios/ReelPerk.xcworkspace` in Xcode
2. Select **Any iOS Device** or your connected device
3. Go to **Product → Archive**
4. Wait for archive to complete
5. In Organizer window:
   - Click **Distribute App**
   - Select **App Store Connect**
   - Follow the wizard to upload

#### Option B: Using Command Line

```bash
npm run build:ios
```

This creates an archive. Then:
1. Open Xcode → Window → Organizer
2. Select your archive
3. Click **Distribute App**

### Step 7: Submit to App Store

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app (if first time)
3. Fill in app information:
   - Name: ReelPerk ERP
   - Category: Business
   - Description, keywords, screenshots
4. Upload screenshots (required sizes):
   - iPhone 6.7" (1290 x 2796)
   - iPhone 6.5" (1242 x 2688)
   - iPad Pro 12.9" (2048 x 2732)
5. Submit for review

---

## 🤖 Android Build Instructions

### Prerequisites

1. **Android Studio** latest version
2. **Java JDK** 11 or higher
3. **Android SDK** (via Android Studio)
4. **Google Play Developer Account** ($25 one-time)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Android Project

Edit `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        applicationId "com.reelperk.erp"
        versionCode 1
        versionName "1.0.0"
        // ... other config
    }
}
```

### Step 3: Generate Keystore (First Time Only)

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore reelperk-release-key.keystore -alias reelperk-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: Save the keystore password and key password securely!

### Step 4: Configure Signing

Create or edit `android/gradle.properties`:

```properties
REELPERK_RELEASE_STORE_FILE=reelperk-release-key.keystore
REELPERK_RELEASE_KEY_ALIAS=reelperk-key-alias
REELPERK_RELEASE_STORE_PASSWORD=your-store-password
REELPERK_RELEASE_KEY_PASSWORD=your-key-password
```

Edit `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('REELPERK_RELEASE_STORE_FILE')) {
                storeFile file(REELPERK_RELEASE_STORE_FILE)
                storePassword REELPERK_RELEASE_STORE_PASSWORD
                keyAlias REELPERK_RELEASE_KEY_ALIAS
                keyPassword REELPERK_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... other config
        }
    }
}
```

### Step 5: Add App Icons

Place app icons in:
- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

Or use Android Studio's Image Asset Studio.

### Step 6: Build Release APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Step 7: Build Release AAB (For Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

**Note**: Google Play requires AAB format, not APK.

### Step 8: Test Release Build

```bash
# Install on connected device
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Step 9: Submit to Google Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app (if first time)
3. Fill in app information:
   - App name: ReelPerk ERP
   - Category: Business
   - Description, screenshots, feature graphic
4. Upload screenshots (required):
   - Phone: 1080 x 1920 (at least 2)
   - Tablet: 1200 x 1600 (optional)
   - Feature graphic: 1024 x 500
5. Upload the **AAB file** (not APK)
6. Fill in content rating questionnaire
7. Set pricing and distribution
8. Submit for review

---

## 🔐 Security Best Practices

### iOS

1. **Never commit** `.p12` certificates or provisioning profiles
2. Use **App Store Connect API** for automated builds
3. Enable **App Transport Security** (already configured)
4. Use **Keychain** for sensitive data storage

### Android

1. **Never commit** keystore files to git
2. Store keystore passwords securely (use CI/CD secrets)
3. Use **ProGuard/R8** for code obfuscation
4. Enable **Play App Signing** in Play Console

---

## 🚀 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: cd ios && pod install
      - run: npm run build:ios

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - uses: actions/setup-java@v2
      - run: npm install
      - run: npm run build:android
```

---

## 📋 Pre-Launch Checklist

### iOS

- [ ] App icon and splash screen added
- [ ] Bundle ID configured
- [ ] Signing certificates set up
- [ ] App Store Connect app created
- [ ] Screenshots prepared
- [ ] Privacy policy URL added
- [ ] App description and keywords ready
- [ ] TestFlight testing completed

### Android

- [ ] App icon added (all densities)
- [ ] Keystore generated and secured
- [ ] Package name configured
- [ ] Play Console app created
- [ ] Screenshots prepared
- [ ] Feature graphic created
- [ ] Privacy policy URL added
- [ ] Content rating completed
- [ ] Internal testing completed

---

## 🐛 Troubleshooting

### iOS Build Issues

**Issue**: "No such module 'React'**
```bash
cd ios
pod install
cd ..
```

**Issue**: "Code signing error"
- Check Team selection in Xcode
- Verify Bundle ID is unique
- Check provisioning profiles

### Android Build Issues

**Issue**: "SDK location not found"
- Set `ANDROID_HOME` environment variable
- Or create `local.properties` in `android/`:
  ```
  sdk.dir=/path/to/android/sdk
  ```

**Issue**: "Keystore not found"
- Verify keystore path in `gradle.properties`
- Check file permissions

---

## 📞 Support

For build issues, check:
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [iOS Deployment Guide](https://reactnative.dev/docs/running-on-device)
- [Android Deployment Guide](https://reactnative.dev/docs/signed-apk-android)

---

**Ready to launch! 🚀**

