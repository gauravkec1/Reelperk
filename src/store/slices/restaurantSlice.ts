/**
 * Restaurant Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  qrCodeId?: string;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  isActive: boolean;
}

interface RestaurantState {
  currentRestaurant: Restaurant | null;
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  currentRestaurant: null,
  restaurants: [],
  isLoading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setCurrentRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.currentRestaurant = action.payload;
    },
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
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
  setCurrentRestaurant,
  setRestaurants,
  setLoading,
  setError,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;

