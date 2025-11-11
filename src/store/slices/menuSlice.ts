/**
 * Menu Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  restaurantId: string;
}

interface MenuState {
  items: MenuItem[];
  categories: string[];
  selectedItem: MenuItem | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  categories: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      const uniqueCategories = [
        ...new Set(action.payload.map(item => item.category)),
      ];
      state.categories = uniqueCategories;
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setSelectedItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedItem = action.payload;
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
  setMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setSelectedItem,
  setLoading,
  setError,
} = menuSlice.actions;
export default menuSlice.reducer;

