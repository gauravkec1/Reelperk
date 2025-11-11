/**
 * Multi-Branch & Franchise Management Type Definitions
 */

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  managerId?: string;
  isActive: boolean;
  settings: {
    independentInventory: boolean;
    independentMenu: boolean;
    independentPricing: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BranchComparison {
  branchId: string;
  branchName: string;
  metrics: {
    sales: number;
    orders: number;
    customers: number;
    avgOrderValue: number;
    profitMargin: number;
  };
  period: string;
}

export interface ConsolidatedReport {
  companyId: string;
  period: string;
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalExpenses: number;
  netProfit: number;
  branchBreakdown: BranchComparison[];
  generatedAt: string;
}

