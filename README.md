# 🍽️ ReelPerk ERP

**Complete ERP and Customer Engagement Platform for Restaurants, Cafés, and Resorts**

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

---

## 🚀 Features

### Core Modules
- 🏠 **Dashboard** - Real-time analytics and insights
- 👥 **Customer Engagement** - QR-based rewards and reel tracking
- 🍔 **Order Management** - Dine-in, takeaway, and delivery
- 📋 **Menu Management** - Complete menu and pricing control
- 💰 **Finance & Accounting** - P&L, expenses, invoices, tax
- 📦 **Inventory Management** - Stock tracking and reorder alerts
- 🧾 **Billing & POS** - Quick billing with multiple payment options
- 🧍 **Staff & HR** - Selfie-based attendance with GPS verification
- 💬 **CRM** - Customer profiles and loyalty programs
- 🧠 **Analytics & Reports** - Comprehensive business insights
- 💌 **Marketing Automation** - WhatsApp/SMS campaigns
- 🧰 **Audit & Compliance** - Complete transaction logs
- 🏪 **Multi-Branch** - Central control for franchises

### Unique Features
- ✅ **Selfie + GPS Attendance** - AI face verification with location
- ✅ **QR Engagement Engine** - Dynamic content and rewards
- ✅ **Real-time Analytics** - Live dashboard updates
- ✅ **Multi-platform** - iOS, Android, and Web support

---

## 📱 Tech Stack

### Frontend
- **React Native** 0.73 - Cross-platform mobile
- **React Native Web** - Web preview support
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **React Native Vector Icons** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - REST API
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Socket.io** - Real-time updates
- **Multer** - File uploads

### Tools
- **Webpack** - Web bundling
- **Jest** - Testing
- **ESLint & Prettier** - Code quality
- **Docker** - Containerization

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- React Native CLI
- Android Studio (for Android builds)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ReelPerk.git
cd ReelPerk

# Install dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Setup database
# Create PostgreSQL database and run migrations
psql -U postgres -d reelperk < database/migrations/001_initial_schema.sql
```

### Run Development

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Web preview
npm run web

# Start backend
npm run backend:dev
```

---

## 📖 Documentation

- [Quick Start Guide](./QUICK_START.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Build Instructions](./BUILD_INSTRUCTIONS.md)
- [APK Build Guide](./APK_BUILD_INSTRUCTIONS.md)
- [Preview in Cursor](./CURSOR_PREVIEW.md)
- [Deployment Guide](./DEPLOYMENT_QUICK_START.md)

---

## 🏗️ Project Structure

```
ReelPerk/
├── src/                 # React Native source
│   ├── components/      # Reusable components
│   ├── screens/         # App screens
│   ├── navigation/      # Navigation setup
│   ├── store/           # Redux store
│   ├── services/        # API services
│   └── utils/           # Utilities
├── backend/             # Node.js backend
│   ├── api/             # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   └── utils/           # Backend utilities
├── database/            # Database files
│   ├── migrations/      # Schema migrations
│   └── seeds/           # Sample data
├── android/             # Android native code
└── web/                 # Web preview files
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` files:

**Frontend** (`.env`):
```
API_URL=http://localhost:5000
```

**Backend** (`backend/.env`):
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=reelperk
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key
```

---

## 📱 Build for Production

### Android APK
```bash
npm run build:apk
```

### Android AAB
```bash
npm run build:aab
```

### Web Build
```bash
npm run web:build
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

**ReelPerk Team**

---

## 🙏 Acknowledgments

- React Native Community
- All open-source contributors

---

## 📞 Support

For support, email support@reelperk.com or open an issue.

---

**Made with ❤️ by ReelPerk Team**
