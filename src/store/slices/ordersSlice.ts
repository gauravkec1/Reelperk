/**
 * Orders Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order} from '../../types/order.types';

interface OrdersState {
  orders: Order[];
  activeOrders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  activeOrders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.activeOrders = action.payload.filter(
        order =>
          order.status !== 'completed' && order.status !== 'cancelled',
      );
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      if (
        action.payload.status !== 'completed' &&
        action.payload.status !== 'cancelled'
      ) {
        state.activeOrders.unshift(action.payload);
      }
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      const activeIndex = state.activeOrders.findIndex(
        o => o.id === action.payload.id,
      );
      if (activeIndex !== -1) {
        if (
          action.payload.status === 'completed' ||
          action.payload.status === 'cancelled'
        ) {
          state.activeOrders.splice(activeIndex, 1);
        } else {
          state.activeOrders[activeIndex] = action.payload;
        }
      }
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  setSelectedOrder,
  setLoading,
  setError,
} = ordersSlice.actions;
export default ordersSlice.reducer;

