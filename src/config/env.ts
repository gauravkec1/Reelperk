/**
 * Environment Configuration
 * Loads environment variables from .env file
 */

// For React Native, we'll use a config file or constants
// Environment variables need to be set at build time or via a config service

const ENV = {
  API_BASE_URL: __DEV__ ? 'http://localhost:5000' : 'https://api.reelperk.in',
  API_VERSION: 'v1',
  NODE_ENV: __DEV__ ? 'development' : 'production',
  
  // Firebase (configure these in your Firebase project)
  FIREBASE_API_KEY: '',
  FIREBASE_AUTH_DOMAIN: '',
  FIREBASE_PROJECT_ID: '',
  FIREBASE_STORAGE_BUCKET: '',
  FIREBASE_MESSAGING_SENDER_ID: '',
  FIREBASE_APP_ID: '',
  
  // Razorpay (configure in your Razorpay dashboard)
  RAZORPAY_KEY_ID: '',
  RAZORPAY_KEY_SECRET: '',
  
  // Social Media APIs
  INSTAGRAM_CLIENT_ID: '',
  INSTAGRAM_CLIENT_SECRET: '',
  INSTAGRAM_REDIRECT_URI: '',
  GOOGLE_MY_BUSINESS_API_KEY: '',
  
  // QR Code
  QR_BASE_URL: 'https://reelperk.in/r',
  
  // Analytics
  ANALYTICS_ENABLED: true,
  MIXPANEL_TOKEN: '',
  
  // Error Tracking
  SENTRY_DSN: '',
};

export default ENV;

