/**
 * QR & Engagement Redux Slice
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  QRCode,
  MediaUpload,
  Reward,
  EngagementStats,
} from '../../types/qr.types';

interface QRState {
  qrCode: QRCode | null;
  mediaUploads: MediaUpload[];
  rewards: Reward[];
  engagementStats: EngagementStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: QRState = {
  qrCode: null,
  mediaUploads: [],
  rewards: [],
  engagementStats: null,
  isLoading: false,
  error: null,
};

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setQRCode: (state, action: PayloadAction<QRCode>) => {
      state.qrCode = action.payload;
    },
    setMediaUploads: (state, action: PayloadAction<MediaUpload[]>) => {
      state.mediaUploads = action.payload;
    },
    addMediaUpload: (state, action: PayloadAction<MediaUpload>) => {
      state.mediaUploads.unshift(action.payload);
    },
    setRewards: (state, action: PayloadAction<Reward[]>) => {
      state.rewards = action.payload;
    },
    addReward: (state, action: PayloadAction<Reward>) => {
      state.rewards.push(action.payload);
    },
    updateReward: (state, action: PayloadAction<Reward>) => {
      const index = state.rewards.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.rewards[index] = action.payload;
      }
    },
    setEngagementStats: (state, action: PayloadAction<EngagementStats>) => {
      state.engagementStats = action.payload;
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
  setQRCode,
  setMediaUploads,
  addMediaUpload,
  setRewards,
  addReward,
  updateReward,
  setEngagementStats,
  setLoading,
  setError,
} = qrSlice.actions;
export default qrSlice.reducer;

