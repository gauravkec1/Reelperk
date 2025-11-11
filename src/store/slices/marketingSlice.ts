/**
 * Marketing Automation Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  MarketingCampaign,
  PromoCode,
  ReferralCampaign,
} from '../../types/marketing.types';

interface MarketingState {
  campaigns: MarketingCampaign[];
  promoCodes: PromoCode[];
  referralCampaigns: ReferralCampaign[];
  selectedCampaign: MarketingCampaign | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketingState = {
  campaigns: [],
  promoCodes: [],
  referralCampaigns: [],
  selectedCampaign: null,
  isLoading: false,
  error: null,
};

const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<MarketingCampaign[]>) => {
      state.campaigns = action.payload;
    },
    addCampaign: (state, action: PayloadAction<MarketingCampaign>) => {
      state.campaigns.unshift(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<MarketingCampaign>) => {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
    setPromoCodes: (state, action: PayloadAction<PromoCode[]>) => {
      state.promoCodes = action.payload;
    },
    addPromoCode: (state, action: PayloadAction<PromoCode>) => {
      state.promoCodes.push(action.payload);
    },
    updatePromoCode: (state, action: PayloadAction<PromoCode>) => {
      const index = state.promoCodes.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.promoCodes[index] = action.payload;
      }
    },
    setReferralCampaigns: (state, action: PayloadAction<ReferralCampaign[]>) => {
      state.referralCampaigns = action.payload;
    },
    setSelectedCampaign: (state, action: PayloadAction<MarketingCampaign | null>) => {
      state.selectedCampaign = action.payload;
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
  setCampaigns,
  addCampaign,
  updateCampaign,
  setPromoCodes,
  addPromoCode,
  updatePromoCode,
  setReferralCampaigns,
  setSelectedCampaign,
  setLoading,
  setError,
} = marketingSlice.actions;
export default marketingSlice.reducer;

