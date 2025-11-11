/**
 * Enhanced Inventory Management Type Definitions
 */

export interface Supplier {
  id: string;
  restaurantId: string;
  name: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  paymentTerms: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  restaurantId: string;
  supplierId: string;
  orderNumber: string;
  items: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'approved' | 'received' | 'cancelled';
  orderDate: string;
  expectedDeliveryDate?: string;
  receivedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GRN {
  id: string;
  purchaseOrderId: string;
  restaurantId: string;
  receivedItems: Array<{
    itemId: string;
    quantity: number;
    condition: 'good' | 'damaged' | 'expired';
  }>;
  receivedBy: string;
  receivedAt: string;
  notes?: string;
  createdAt: string;
}

export interface WasteRecord {
  id: string;
  restaurantId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  reason: 'expired' | 'damaged' | 'spoiled' | 'overcooked' | 'other';
  cost: number;
  recordedBy: string;
  recordedAt: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  restaurantId: string;
  menuItemId: string;
  menuItemName: string;
  ingredients: Array<{
    inventoryItemId: string;
    inventoryItemName: string;
    quantity: number;
    unit: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

