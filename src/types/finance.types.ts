/**
 * Finance & Accounting Type Definitions
 */

export enum ExpenseCategory {
  RENT = 'rent',
  SUPPLIES = 'supplies',
  UTILITIES = 'utilities',
  SALARIES = 'salaries',
  MARKETING = 'marketing',
  MAINTENANCE = 'maintenance',
  INSURANCE = 'insurance',
  OTHER = 'other',
}

export enum IncomeSource {
  POS = 'pos',
  ONLINE_ORDERS = 'online_orders',
  CATERING = 'catering',
  DELIVERY = 'delivery',
  OTHER = 'other',
}

export enum TaxType {
  GST = 'gst',
  TDS = 'tds',
  SERVICE_TAX = 'service_tax',
}

export interface Expense {
  id: string;
  restaurantId: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  vendorId?: string;
  receiptUrl?: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: string;
  restaurantId: string;
  source: IncomeSource;
  amount: number;
  date: string;
  orderId?: string;
  description?: string;
  createdAt: string;
}

export interface TaxRecord {
  id: string;
  restaurantId: string;
  type: TaxType;
  amount: number;
  period: string; // e.g., "2024-01"
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  createdAt: string;
}

export interface ProfitLoss {
  id: string;
  restaurantId: string;
  period: string;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  grossProfit: number;
  createdAt: string;
}

export interface Vendor {
  id: string;
  restaurantId: string;
  name: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  paymentTerms: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorPayment {
  id: string;
  vendorId: string;
  restaurantId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'upi';
  referenceNumber?: string;
  description?: string;
  createdAt: string;
}

export interface PettyCash {
  id: string;
  restaurantId: string;
  amount: number;
  purpose: string;
  date: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

