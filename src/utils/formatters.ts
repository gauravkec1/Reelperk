/**
 * Formatter Utilities
 * Date, currency, and number formatting functions
 */

import {format, formatDistanceToNow} from 'date-fns';

/**
 * Format currency (Indian Rupees)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date: string | Date, formatStr: string = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd MMM yyyy, hh:mm a');
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, {addSuffix: true});
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Indian phone number format: +91 XXXXX XXXXX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

