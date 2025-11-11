/**
 * Authentication Type Definitions
 */

export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  MANAGER = 'manager',
  CHEF = 'chef',
  CASHIER = 'cashier',
  WAITER = 'waiter',
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  restaurantId?: string;
  restaurantIds?: string[]; // For multi-restaurant access
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  restaurantName: string;
  restaurantAddress: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

