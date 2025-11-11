/**
 * Order Type Definitions
 */

export enum OrderType {
  DINE_IN = 'dine_in',
  TAKEAWAY = 'takeaway',
  DELIVERY = 'delivery',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  SERVED = 'served',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  total: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  tableNumber?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  servedBy?: string;
}

