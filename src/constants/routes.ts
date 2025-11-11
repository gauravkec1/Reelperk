/**
 * Navigation Route Names
 * Centralized route name constants
 */

export const ROUTES = {
  // Auth Routes
  AUTH: 'Auth',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  OTP_VERIFICATION: 'OTPVerification',
  
  // Main App Routes
  MAIN: 'Main',
  DASHBOARD: 'Dashboard',
  ANALYTICS: 'Analytics',
  
  // Order Routes
  ORDERS: 'Orders',
  ORDERS_LIST: 'OrdersList',
  CREATE_ORDER: 'CreateOrder',
  ORDER_DETAILS: 'OrderDetails',
  KOT: 'KOT',
  
  // Menu Routes
  MENU: 'Menu',
  MENU_LIST: 'MenuList',
  MENU_ITEM_FORM: 'MenuItemForm',
  CATEGORY_MANAGEMENT: 'CategoryManagement',
  
  // Billing Routes
  BILLING: 'Billing',
  PAYMENT: 'Payment',
  RECEIPT: 'Receipt',
  
  // Inventory Routes
  INVENTORY: 'Inventory',
  INVENTORY_LIST: 'InventoryList',
  INVENTORY_ITEM_FORM: 'InventoryItemForm',
  STOCK_ALERTS: 'StockAlerts',
  
  // Employee Routes
  EMPLOYEES: 'Employees',
  EMPLOYEES_LIST: 'EmployeesList',
  EMPLOYEE_FORM: 'EmployeeForm',
  ATTENDANCE: 'Attendance',
  PAYROLL: 'Payroll',
  
  // QR & Engagement Routes
  QR: 'QR',
  QR_CODE: 'QRCode',
  QR_CODE_DISPLAY: 'QRCodeDisplay',
  MEDIA_UPLOAD: 'MediaUpload',
  REWARDS: 'Rewards',
  ENGAGEMENT_ANALYTICS: 'EngagementAnalytics',
  LANDING_PAGE: 'LandingPage',
  
  // Reports Routes
  REPORTS: 'Reports',
  SALES_REPORTS: 'SalesReports',
  ENGAGEMENT_REPORTS: 'EngagementReports',
  EXPORT_REPORTS: 'ExportReports',
  
  // Marketing Routes
  MARKETING: 'Marketing',
  CAMPAIGNS: 'Campaigns',
  SOCIAL_INTEGRATION: 'SocialIntegration',
  COMMUNICATION: 'Communication',
  
  // Finance Routes
  FINANCE: 'Finance',
  EXPENSES: 'Expenses',
  INCOME: 'Income',
  PROFIT_LOSS: 'ProfitLoss',
  TAX_MANAGEMENT: 'TaxManagement',
  VENDORS: 'Vendors',
  VENDOR_PAYMENTS: 'VendorPayments',
  
  // Audit Routes
  AUDIT: 'Audit',
  AUDIT_LOGS: 'AuditLogs',
  EXPENSE_VERIFICATION: 'ExpenseVerification',
  AUDIT_REPORTS: 'AuditReports',
  
  // CRM Routes
  CRM: 'CRM',
  CUSTOMERS: 'Customers',
  CUSTOMER_DETAILS: 'CustomerDetails',
  LOYALTY_PROGRAM: 'LoyaltyProgram',
  CUSTOMER_FEEDBACK: 'CustomerFeedback',
  CUSTOMER_SEGMENTS: 'CustomerSegments',
  
  // Marketing Routes
  MARKETING: 'Marketing',
  CAMPAIGNS: 'Campaigns',
  PROMO_CODES: 'PromoCodes',
  REFERRAL_CAMPAIGNS: 'ReferralCampaigns',
  
  // Branch Management Routes
  BRANCHES: 'Branches',
  BRANCH_COMPARISON: 'BranchComparison',
  CONSOLIDATED_REPORTS: 'ConsolidatedReports',
  
  // Settings Routes
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  RESTAURANT_SETTINGS: 'RestaurantSettings',
  SUBSCRIPTION: 'Subscription',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

