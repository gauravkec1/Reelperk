/**
 * Audit & Compliance Type Definitions
 */

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  APPROVE = 'approve',
  REJECT = 'reject',
  LOGIN = 'login',
  LOGOUT = 'logout',
}

export enum AuditModule {
  ORDERS = 'orders',
  MENU = 'menu',
  INVENTORY = 'inventory',
  FINANCE = 'finance',
  STAFF = 'staff',
  SETTINGS = 'settings',
  MARKETING = 'marketing',
}

export interface AuditLog {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  module: AuditModule;
  action: AuditAction;
  entityType: string; // e.g., 'Order', 'MenuItem', 'Expense'
  entityId: string;
  description: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface ExpenseVerification {
  id: string;
  expenseId: string;
  restaurantId: string;
  verifiedBy?: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
  attachments?: string[];
  createdAt: string;
}

export interface AuditReport {
  id: string;
  restaurantId: string;
  period: string;
  totalActions: number;
  moduleBreakdown: Record<AuditModule, number>;
  topUsers: Array<{userId: string; userName: string; actionCount: number}>;
  generatedAt: string;
}

