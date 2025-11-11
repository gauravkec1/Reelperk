/**
 * Navigation Type Definitions
 * Centralized navigation types for type safety
 */

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../constants/routes';

// Auth Stack
export type AuthStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.OTP_VERIFICATION]: {email: string};
};

// Main Tab Stack
export type TabParamList = {
  [ROUTES.DASHBOARD]: undefined;
  [ROUTES.ORDERS]: undefined;
  [ROUTES.MENU]: undefined;
  [ROUTES.QR]: undefined;
  [ROUTES.SETTINGS]: undefined;
};

// Root Navigator
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Screen Props Types
export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;

// Navigation Hooks Types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

