# 📁 ReelPerk ERP - Project Structure

## Complete Folder Structure

```
ReelPerk/
├── .github/                          # GitHub workflows for CI/CD
│   └── workflows/
│       ├── ios-build.yml
│       └── android-build.yml
│
├── android/                          # Android native code
│   ├── app/
│   ├── build.gradle
│   └── gradle.properties
│
├── ios/                              # iOS native code
│   ├── ReelPerk/
│   ├── ReelPerk.xcodeproj
│   └── Podfile
│
├── src/                              # Main source code
│   ├── components/                   # Reusable UI components
│   │   ├── common/                   # Common components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Loading/
│   │   │   ├── EmptyState/
│   │   │   └── ErrorBoundary/
│   │   ├── dashboard/                # Dashboard-specific components
│   │   │   ├── MetricCard/
│   │   │   ├── RevenueChart/
│   │   │   └── QuickActions/
│   │   ├── orders/                   # Order management components
│   │   │   ├── OrderCard/
│   │   │   ├── OrderItem/
│   │   │   ├── OrderStatusBadge/
│   │   │   └── KOTView/
│   │   ├── menu/                     # Menu components
│   │   │   ├── MenuItemCard/
│   │   │   ├── CategoryFilter/
│   │   │   └── MenuItemModal/
│   │   ├── qr/                       # QR & Engagement components
│   │   │   ├── QRCodeDisplay/
│   │   │   ├── QRScanner/
│   │   │   ├── MediaUploader/
│   │   │   ├── RewardCard/
│   │   │   └── EngagementStats/
│   │   └── billing/                  # Billing components
│   │       ├── BillItem/
│   │       ├── PaymentMethod/
│   │       └── ReceiptView/
│   │
│   ├── screens/                      # Screen components
│   │   ├── auth/                     # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── OTPVerificationScreen.tsx
│   │   ├── dashboard/                # Dashboard screens
│   │   │   ├── DashboardScreen.tsx
│   │   │   └── AnalyticsScreen.tsx
│   │   ├── orders/                   # Order management screens
│   │   │   ├── OrdersListScreen.tsx
│   │   │   ├── CreateOrderScreen.tsx
│   │   │   ├── OrderDetailsScreen.tsx
│   │   │   └── KOTScreen.tsx
│   │   ├── menu/                     # Menu management screens
│   │   │   ├── MenuListScreen.tsx
│   │   │   ├── MenuItemFormScreen.tsx
│   │   │   └── CategoryManagementScreen.tsx
│   │   ├── billing/                  # Billing screens
│   │   │   ├── BillingScreen.tsx
│   │   │   ├── PaymentScreen.tsx
│   │   │   └── ReceiptScreen.tsx
│   │   ├── inventory/                # Inventory screens
│   │   │   ├── InventoryListScreen.tsx
│   │   │   ├── InventoryItemFormScreen.tsx
│   │   │   └── StockAlertsScreen.tsx
│   │   ├── employees/                # Employee management screens
│   │   │   ├── EmployeesListScreen.tsx
│   │   │   ├── EmployeeFormScreen.tsx
│   │   │   ├── AttendanceScreen.tsx
│   │   │   └── PayrollScreen.tsx
│   │   ├── qr/                       # QR & Engagement screens
│   │   │   ├── QRCodeScreen.tsx
│   │   │   ├── MediaUploadScreen.tsx
│   │   │   ├── RewardsScreen.tsx
│   │   │   ├── EngagementAnalyticsScreen.tsx
│   │   │   └── LandingPageScreen.tsx (for QR redirect)
│   │   ├── reports/                  # Reports screens
│   │   │   ├── SalesReportsScreen.tsx
│   │   │   ├── EngagementReportsScreen.tsx
│   │   │   └── ExportReportsScreen.tsx
│   │   ├── marketing/                # Marketing screens
│   │   │   ├── CampaignsScreen.tsx
│   │   │   ├── SocialIntegrationScreen.tsx
│   │   │   └── CommunicationScreen.tsx
│   │   └── settings/                 # Settings screens
│   │       ├── SettingsScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       ├── RestaurantSettingsScreen.tsx
│   │       └── SubscriptionScreen.tsx
│   │
│   ├── navigation/                   # Navigation configuration
│   │   ├── AppNavigator.tsx          # Main app navigator
│   │   ├── AuthNavigator.tsx         # Auth flow navigator
│   │   ├── TabNavigator.tsx          # Bottom tab navigator
│   │   ├── StackNavigator.tsx        # Stack navigator
│   │   └── navigationTypes.ts        # Navigation type definitions
│   │
│   ├── store/                        # Redux store
│   │   ├── index.ts                  # Store configuration
│   │   ├── slices/                   # Redux slices
│   │   │   ├── authSlice.ts
│   │   │   ├── restaurantSlice.ts
│   │   │   ├── ordersSlice.ts
│   │   │   ├── menuSlice.ts
│   │   │   ├── inventorySlice.ts
│   │   │   ├── employeesSlice.ts
│   │   │   ├── qrSlice.ts
│   │   │   ├── billingSlice.ts
│   │   │   ├── analyticsSlice.ts
│   │   │   └── settingsSlice.ts
│   │   └── api/                      # RTK Query API
│   │       ├── baseApi.ts
│   │       ├── authApi.ts
│   │       ├── ordersApi.ts
│   │       ├── menuApi.ts
│   │       ├── qrApi.ts
│   │       └── analyticsApi.ts
│   │
│   ├── services/                     # API & external services
│   │   ├── api/                      # API service layer
│   │   │   ├── client.ts             # Axios/Fetch client
│   │   │   ├── endpoints.ts          # API endpoints
│   │   │   └── interceptors.ts       # Request/Response interceptors
│   │   ├── auth/                     # Authentication service
│   │   │   ├── authService.ts
│   │   │   └── tokenManager.ts
│   │   ├── storage/                  # Local storage
│   │   │   ├── asyncStorage.ts
│   │   │   └── secureStorage.ts
│   │   ├── qr/                       # QR code services
│   │   │   ├── qrGenerator.ts
│   │   │   └── qrScanner.ts
│   │   ├── payment/                  # Payment services
│   │   │   └── razorpayService.ts
│   │   ├── social/                   # Social media integration
│   │   │   ├── instagramService.ts
│   │   │   └── googleBusinessService.ts
│   │   ├── notifications/            # Push notifications
│   │   │   └── notificationService.ts
│   │   └── analytics/                # Analytics services
│   │       └── analyticsService.ts
│   │
│   ├── utils/                        # Utility functions
│   │   ├── formatters.ts             # Date, currency formatters
│   │   ├── validators.ts             # Form validation
│   │   ├── helpers.ts                # General helpers
│   │   ├── constants.ts              # App-wide constants
│   │   └── permissions.ts            # Permission handlers
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useOrders.ts
│   │   ├── useQR.ts
│   │   ├── useAnalytics.ts
│   │   └── usePermissions.ts
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── order.types.ts
│   │   ├── menu.types.ts
│   │   ├── qr.types.ts
│   │   ├── restaurant.types.ts
│   │   └── api.types.ts
│   │
│   ├── constants/                    # App constants
│   │   ├── colors.ts                 # Color palette
│   │   ├── fonts.ts                  # Font definitions
│   │   ├── sizes.ts                  # Size constants
│   │   ├── routes.ts                 # Route names
│   │   └── config.ts                 # App configuration
│   │
│   ├── assets/                       # Static assets
│   │   ├── images/                   # Images
│   │   │   ├── logo.png
│   │   │   ├── splash.png
│   │   │   └── icons/
│   │   ├── fonts/                    # Custom fonts
│   │   └── animations/               # Lottie animations
│   │
│   ├── config/                       # Configuration files
│   │   ├── env.ts                    # Environment variables
│   │   ├── theme.ts                  # Theme configuration
│   │   └── api.config.ts             # API configuration
│   │
│   └── __tests__/                    # Test files
│       ├── components/
│       ├── screens/
│       ├── utils/
│       └── services/
│
├── .env                              # Environment variables (not in git)
├── .env.example                      # Example environment file
├── .gitignore
├── .eslintrc.js                      # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── app.json                          # Expo/React Native config
├── babel.config.js                   # Babel configuration
├── metro.config.js                   # Metro bundler config
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── package-lock.json
├── README.md                         # Project documentation
├── IMPLEMENTATION_PLAN.md            # Implementation plan
└── PROJECT_STRUCTURE.md              # This file
```

## Key Features of This Structure

### ✅ Modular Organization
- Clear separation of concerns
- Easy to navigate and maintain
- Scalable architecture

### ✅ Component Reusability
- Common components in `components/common/`
- Feature-specific components grouped by module
- Consistent component structure

### ✅ Type Safety
- TypeScript throughout
- Type definitions in `types/`
- Type-safe navigation

### ✅ State Management
- Redux Toolkit for global state
- RTK Query for API calls
- Organized by feature slices

### ✅ Service Layer
- Clean API abstraction
- Reusable service functions
- Easy to mock for testing

### ✅ Testing Ready
- Test files mirror source structure
- Easy to find and write tests
- Supports unit, integration, and E2E tests

### ✅ Production Ready
- Environment configuration
- CI/CD setup
- Build configurations for iOS & Android

---

## Module Breakdown

### 🔐 Authentication Module
- Login, registration, password reset
- OTP verification
- Biometric authentication
- Role-based access

### 📊 Dashboard Module
- Real-time metrics
- Revenue charts
- Quick actions
- Analytics widgets

### 🍽️ Order Management Module
- Order creation and tracking
- KOT generation
- Status management
- Real-time updates

### 📋 Menu Management Module
- CRUD operations
- Category management
- Image upload
- Availability toggle

### 💳 Billing & Payments Module
- Bill generation
- Payment integration (Razorpay)
- Receipt generation
- Refund management

### 📦 Inventory Module
- Stock tracking
- Auto-deduction
- Low stock alerts
- Reports

### 👥 Employee Module
- Employee management
- Attendance tracking
- Payroll
- Performance

### 🎁 ReelPerk Engine (Core)
- QR code generation
- Media upload
- Dynamic landing page
- Reward system
- Engagement tracking

### 📈 Analytics & Reports
- Sales reports
- Engagement metrics
- Export functionality
- Scheduled reports

### 📢 Marketing Module
- Campaign management
- Social integration
- Communication tools

### ⚙️ Settings Module
- Profile management
- Restaurant settings
- Subscription management

---

This structure is designed to be:
- **Scalable**: Easy to add new features
- **Maintainable**: Clear organization
- **Testable**: Test files alongside source
- **Production-ready**: All configs for deployment

