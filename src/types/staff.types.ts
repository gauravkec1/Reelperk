/**
 * Enhanced Staff & HR Management Type Definitions
 */

export enum ShiftType {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
}

export interface Shift {
  id: string;
  restaurantId: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  breakDuration?: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  restaurantId: string;
  date: string;
  shiftId?: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInMethod: 'qr' | 'face_recognition' | 'manual';
  status: 'present' | 'absent' | 'late' | 'half_day';
  lateMinutes?: number;
  overtimeMinutes?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  restaurantId: string;
  period: string; // e.g., "2024-01"
  baseSalary: number;
  allowances: number;
  deductions: number;
  taxDeductions: number;
  netSalary: number;
  tips: number;
  commissions: number;
  totalEarnings: number;
  status: 'pending' | 'processed' | 'paid';
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  restaurantId: string;
  reviewedBy: string;
  period: string;
  ratings: {
    punctuality: number;
    workQuality: number;
    teamwork: number;
    customerService: number;
    overall: number;
  };
  comments: string;
  goals: string[];
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  restaurantId: string;
  type: 'sick' | 'casual' | 'earned' | 'unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

