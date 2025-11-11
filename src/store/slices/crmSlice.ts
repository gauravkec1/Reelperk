/**
 * CRM & Customer Management Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Customer,
  LoyaltyProgram,
  LoyaltyTransaction,
  CustomerFeedback,
  CustomerSegment,
} from '../../types/crm.types';

interface CRMState {
  customers: Customer[];
  loyaltyProgram: LoyaltyProgram | null;
  loyaltyTransactions: LoyaltyTransaction[];
  feedback: CustomerFeedback[];
  segments: CustomerSegment[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CRMState = {
  customers: [],
  loyaltyProgram: null,
  loyaltyTransactions: [],
  feedback: [],
  segments: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
};

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    setLoyaltyProgram: (state, action: PayloadAction<LoyaltyProgram>) => {
      state.loyaltyProgram = action.payload;
    },
    setLoyaltyTransactions: (state, action: PayloadAction<LoyaltyTransaction[]>) => {
      state.loyaltyTransactions = action.payload;
    },
    addLoyaltyTransaction: (state, action: PayloadAction<LoyaltyTransaction>) => {
      state.loyaltyTransactions.unshift(action.payload);
    },
    setFeedback: (state, action: PayloadAction<CustomerFeedback[]>) => {
      state.feedback = action.payload;
    },
    addFeedback: (state, action: PayloadAction<CustomerFeedback>) => {
      state.feedback.unshift(action.payload);
    },
    setSegments: (state, action: PayloadAction<CustomerSegment[]>) => {
      state.segments = action.payload;
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
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
  setCustomers,
  addCustomer,
  updateCustomer,
  setLoyaltyProgram,
  setLoyaltyTransactions,
  addLoyaltyTransaction,
  setFeedback,
  addFeedback,
  setSegments,
  setSelectedCustomer,
  setLoading,
  setError,
} = crmSlice.actions;
export default crmSlice.reducer;

