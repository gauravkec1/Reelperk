# 🚀 ReelPerk ERP

**Complete business management and customer engagement platform for cafés and restaurants**

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

---

## 📱 Overview

ReelPerk ERP is a comprehensive mobile application that combines traditional restaurant ERP features with innovative customer engagement through QR codes and social media rewards. Built with React Native for iOS and Android.

### Key Features

- 📊 **Dashboard** - Real-time business metrics and analytics
- 🍽️ **Order Management** - Dine-in, takeaway, and delivery orders
- 📋 **Menu Management** - Complete menu CRUD operations
- 💳 **Billing & Payments** - Integrated Razorpay payment gateway
- 📦 **Inventory Management** - Stock tracking and alerts
- 👥 **Employee Management** - Staff, attendance, and payroll
- 🎁 **ReelPerk Engine** - QR codes, media uploads, and reward system
- 📈 **Analytics & Reports** - Comprehensive business insights
- 📢 **Marketing Tools** - Campaigns and social media integration

---

## 🛠️ Tech Stack

- **Framework**: React Native 0.73
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Navigation**: React Navigation v6
- **UI Components**: Custom components with theme system
- **Testing**: Jest + React Native Testing Library
- **Build Tools**: Metro Bundler, Babel

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **React Native CLI**: `npm install -g react-native-cli`
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **Java Development Kit (JDK)** 11 or higher
- **CocoaPods** (for iOS): `sudo gem install cocoapods`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ReelPerk
```

### 2. Install Dependencies

```bash
npm install
```

### 3. iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
API_BASE_URL=https://api.reelperk.in
API_VERSION=v1
NODE_ENV=development
# Add your API keys and configuration
```

### 5. Start Metro Bundler

```bash
npm start
```

### 6. Run on iOS

```bash
npm run ios
```

Or open `ios/ReelPerk.xcworkspace` in Xcode and run from there.

### 7. Run on Android

```bash
npm run android
```

Make sure you have an Android emulator running or a device connected.

---

## 📁 Project Structure

```
ReelPerk/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── store/           # Redux store & slices
│   ├── services/        # API & external services
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript types
│   ├── constants/       # App constants
│   ├── hooks/           # Custom React hooks
│   ├── assets/          # Images, fonts, etc.
│   └── config/          # App configuration
├── android/             # Android native code
├── ios/                 # iOS native code
└── __tests__/           # Test files
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure.

---

## 🏗️ Building for Production

### Android

#### 1. Generate Keystore (First time only)

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore reelperk-release-key.keystore -alias reelperk-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### 2. Configure Gradle

Edit `android/gradle.properties` and add:

```properties
REELPERK_RELEASE_STORE_FILE=reelperk-release-key.keystore
REELPERK_RELEASE_KEY_ALIAS=reelperk-key-alias
REELPERK_RELEASE_STORE_PASSWORD=your-store-password
REELPERK_RELEASE_KEY_PASSWORD=your-key-password
```

#### 3. Build Release APK

```bash
npm run build:android
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

#### 4. Build Release AAB (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS

#### 1. Configure in Xcode

1. Open `ios/ReelPerk.xcworkspace` in Xcode
2. Select your development team in Signing & Capabilities
3. Update Bundle Identifier if needed

#### 2. Build Archive

```bash
npm run build:ios
```

Or in Xcode:
1. Product → Archive
2. Distribute App → App Store Connect
3. Follow the upload process

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

---

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Auto-fix Linting Issues

```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

### Type Checking

```bash
npm run type-check
```

---

## 🚢 Deployment

### iOS App Store

1. **Prepare for Submission**
   - Update version in `app.json` and `ios/ReelPerk/Info.plist`
   - Update build number
   - Create app icon and splash screens
   - Configure App Store Connect

2. **Archive and Upload**
   - Build archive in Xcode
   - Upload to App Store Connect
   - Submit for review

### Google Play Store

1. **Prepare for Submission**
   - Update version in `app.json` and `android/app/build.gradle`
   - Update version code
   - Create app icon and feature graphics
   - Configure Google Play Console

2. **Upload AAB**
   - Generate signed AAB
   - Upload to Play Console
   - Submit for review

---

## 🔧 Configuration

### App Configuration

- **App Name**: Edit `app.json`
- **Bundle ID/Package**: 
  - iOS: `ios/ReelPerk/Info.plist`
  - Android: `android/app/build.gradle`

### API Configuration

Edit `src/config/env.ts` or use environment variables in `.env`

### Theme Customization

Edit `src/config/theme.ts` to customize colors, typography, and spacing.

---

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Complete development roadmap
- [Project Structure](./PROJECT_STRUCTURE.md) - Detailed folder structure
- [API Documentation](./docs/API.md) - API endpoints (coming soon)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

**ReelPerk Team**

---

## 🆘 Support

For support, email support@reelperk.in or open an issue in the repository.

---

## 🗺️ Roadmap

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the complete development roadmap.

**Current Status**: Foundation & Core Setup ✅

**Next Steps**:
- [ ] Complete authentication flow
- [ ] Implement order management
- [ ] Build QR code engine
- [ ] Add payment integration
- [ ] Implement analytics dashboard

---

**Made with ❤️ for cafés and restaurants**

