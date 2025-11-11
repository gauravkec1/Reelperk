/**
 * Redux Store Configuration
 * Web-compatible version
 */

import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import restaurantSlice from './slices/restaurantSlice';
import ordersSlice from './slices/ordersSlice';
import menuSlice from './slices/menuSlice';
import qrSlice from './slices/qrSlice';
import financeSlice from './slices/financeSlice';
import crmSlice from './slices/crmSlice';
import marketingSlice from './slices/marketingSlice';
import branchSlice from './slices/branchSlice';

// Simplified store for web builds - RTK Query causes build issues
export const store = configureStore({
  reducer: {
    auth: authSlice,
    restaurant: restaurantSlice,
    orders: ordersSlice,
    menu: menuSlice,
    qr: qrSlice,
    finance: financeSlice,
    crm: crmSlice,
    marketing: marketingSlice,
    branch: branchSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
