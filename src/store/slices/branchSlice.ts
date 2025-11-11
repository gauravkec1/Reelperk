/**
 * Multi-Branch & Franchise Management Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Branch, BranchComparison, ConsolidatedReport} from '../../types/branch.types';

interface BranchState {
  branches: Branch[];
  currentBranch: Branch | null;
  comparisons: BranchComparison[];
  consolidatedReport: ConsolidatedReport | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  currentBranch: null,
  comparisons: [],
  consolidatedReport: null,
  isLoading: false,
  error: null,
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranches: (state, action: PayloadAction<Branch[]>) => {
      state.branches = action.payload;
    },
    addBranch: (state, action: PayloadAction<Branch>) => {
      state.branches.push(action.payload);
    },
    updateBranch: (state, action: PayloadAction<Branch>) => {
      const index = state.branches.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.branches[index] = action.payload;
      }
    },
    setCurrentBranch: (state, action: PayloadAction<Branch | null>) => {
      state.currentBranch = action.payload;
    },
    setComparisons: (state, action: PayloadAction<BranchComparison[]>) => {
      state.comparisons = action.payload;
    },
    setConsolidatedReport: (state, action: PayloadAction<ConsolidatedReport | null>) => {
      state.consolidatedReport = action.payload;
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
  setBranches,
  addBranch,
  updateBranch,
  setCurrentBranch,
  setComparisons,
  setConsolidatedReport,
  setLoading,
  setError,
} = branchSlice.actions;
export default branchSlice.reducer;

