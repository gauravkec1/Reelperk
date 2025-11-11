/**
 * Theme Configuration
 * ReelPerk ERP Color Palette and Design System
 */

export const colors = {
  // Primary Colors (Coffee Theme)
  primary: '#8B4513', // Coffee Brown
  primaryDark: '#654321',
  primaryLight: '#A0522D',
  
  // Secondary Colors
  secondary: '#D4AF37', // Gold
  secondaryDark: '#B8860B',
  secondaryLight: '#F4D03F',
  
  // Accent Colors
  accent: '#F5DEB3', // Cream/Wheat
  accentDark: '#DEB887',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  grayLight: '#F5F5F5',
  grayMedium: '#CCCCCC',
  grayDark: '#333333',
  
  // Status Colors
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  surface: '#FFFFFF',
  
  // Text Colors
  text: '#212529',
  textSecondary: '#6C757D',
  textLight: '#FFFFFF',
  
  // Border Colors
  border: '#DEE2E6',
  borderLight: '#E9ECEF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;

