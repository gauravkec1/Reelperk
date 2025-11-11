/**
 * Validation Utilities
 * Form validation functions
 */

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
};

/**
 * Validate password (min 8 chars, at least one letter and one number)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

/**
 * Validate required field
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate OTP (6 digits)
 */
export const isValidOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

