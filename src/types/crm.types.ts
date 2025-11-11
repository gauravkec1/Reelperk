/**
 * CRM & Customer Management Type Definitions
 */

export interface Customer {
  id: string;
  restaurantId: string;
  name: string;
  phone: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
  preferences?: string[];
  allergies?: string[];
  totalVisits: number;
  totalSpent: number;
  lastVisitDate?: string;
  loyaltyPoints: number;
  customerSegment: 'vip' | 'regular' | 'occasional' | 'new';
  createdAt: string;
  updatedAt: string;
}

export interface LoyaltyProgram {
  id: string;
  restaurantId: string;
  name: string;
  pointsPerRupee: number;
  redemptionRules: {
    pointsRequired: number;
    discountAmount: number;
    discountType: 'percentage' | 'fixed';
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoyaltyTransaction {
  id: string;
  customerId: string;
  restaurantId: string;
  type: 'earned' | 'redeemed' | 'expired';
  points: number;
  orderId?: string;
  description: string;
  createdAt: string;
}

export interface CustomerFeedback {
  id: string;
  customerId: string;
  restaurantId: string;
  orderId?: string;
  rating: number; // 1-5
  comment?: string;
  categories: string[]; // food_quality, service, ambiance, etc.
  status: 'pending' | 'acknowledged' | 'resolved';
  createdAt: string;
}

export interface CustomerSegment {
  id: string;
  restaurantId: string;
  name: string;
  criteria: {
    minVisits?: number;
    minSpent?: number;
    lastVisitDays?: number;
    tags?: string[];
  };
  customerCount: number;
  createdAt: string;
}

