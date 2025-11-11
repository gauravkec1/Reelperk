/**
 * Finance & Accounting Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Expense,
  Income,
  TaxRecord,
  ProfitLoss,
  Vendor,
  VendorPayment,
} from '../../types/finance.types';

interface FinanceState {
  expenses: Expense[];
  incomes: Income[];
  taxRecords: TaxRecord[];
  profitLoss: ProfitLoss[];
  vendors: Vendor[];
  vendorPayments: VendorPayment[];
  selectedPeriod: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  expenses: [],
  incomes: [],
  taxRecords: [],
  profitLoss: [],
  vendors: [],
  vendorPayments: [],
  selectedPeriod: new Date().toISOString().slice(0, 7), // YYYY-MM
  isLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    setIncomes: (state, action: PayloadAction<Income[]>) => {
      state.incomes = action.payload;
    },
    addIncome: (state, action: PayloadAction<Income>) => {
      state.incomes.unshift(action.payload);
    },
    setTaxRecords: (state, action: PayloadAction<TaxRecord[]>) => {
      state.taxRecords = action.payload;
    },
    setProfitLoss: (state, action: PayloadAction<ProfitLoss[]>) => {
      state.profitLoss = action.payload;
    },
    setVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.vendors = action.payload;
    },
    addVendor: (state, action: PayloadAction<Vendor>) => {
      state.vendors.push(action.payload);
    },
    setVendorPayments: (state, action: PayloadAction<VendorPayment[]>) => {
      state.vendorPayments = action.payload;
    },
    setSelectedPeriod: (state, action: PayloadAction<string>) => {
      state.selectedPeriod = action.payload;
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
  setExpenses,
  addExpense,
  updateExpense,
  setIncomes,
  addIncome,
  setTaxRecords,
  setProfitLoss,
  setVendors,
  addVendor,
  setVendorPayments,
  setSelectedPeriod,
  setLoading,
  setError,
} = financeSlice.actions;
export default financeSlice.reducer;

