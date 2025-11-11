# 📱 Build Android APK - Step by Step

## Prerequisites

1. **Java JDK 11+** installed
2. **Android Studio** installed
3. **Android SDK** configured
4. **Environment variables** set:
   - `ANDROID_HOME` or `ANDROID_SDK_ROOT`

## Step 1: Generate Keystore (First Time Only)

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore reelperk-release-key.keystore -alias reelperk-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important:** Save the passwords securely!

## Step 2: Configure Gradle

Edit `android/gradle.properties` and add:

```properties
REELPERK_RELEASE_STORE_FILE=reelperk-release-key.keystore
REELPERK_RELEASE_KEY_ALIAS=reelperk-key-alias
REELPERK_RELEASE_STORE_PASSWORD=your-store-password
REELPERK_RELEASE_KEY_PASSWORD=your-key-password
```

## Step 3: Build Release APK

### Option A: Using Gradle (Command Line)

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Option B: Using Android Studio

1. Open `android` folder in Android Studio
2. Build → Generate Signed Bundle / APK
3. Select APK
4. Choose your keystore
5. Build

## Step 4: Build Release AAB (For Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

## Step 5: Test APK

```bash
# Install on connected device
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

### Issue: "SDK location not found"
- Set `ANDROID_HOME` environment variable
- Or create `android/local.properties`:
  ```
  sdk.dir=C:/Users/YourName/AppData/Local/Android/Sdk
  ```

### Issue: "Keystore not found"
- Verify keystore path in `gradle.properties`
- Check file permissions

### Issue: Build fails
- Clean build: `cd android && ./gradlew clean`
- Rebuild: `./gradlew assembleRelease`

---

**Your APK will be ready in: `android/app/build/outputs/apk/release/`** 📦

