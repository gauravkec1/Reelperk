/**
 * QR Code & Engagement Type Definitions
 */

export enum MediaType {
  REEL = 'reel',
  PHOTO = 'photo',
  STORY = 'story',
}

export enum RewardType {
  DISCOUNT_CODE = 'discount_code',
  SCRATCH_CARD = 'scratch_card',
  FREE_ITEM = 'free_item',
  LOYALTY_POINTS = 'loyalty_points',
}

export interface QRCode {
  id: string;
  restaurantId: string;
  qrUrl: string;
  staticUrl: string; // e.g., https://reelperk.in/r/12345
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaUpload {
  id: string;
  restaurantId: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  hashtags: string[];
  isActive: boolean;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  id: string;
  restaurantId: string;
  type: RewardType;
  title: string;
  description: string;
  value: number; // Discount percentage, points, etc.
  code?: string; // For discount codes
  expiryDate?: string;
  maxRedemptions?: number;
  currentRedemptions: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QRScan {
  id: string;
  qrCodeId: string;
  restaurantId: string;
  scannedAt: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  userAgent?: string;
  platform?: string;
}

export interface ReelSubmission {
  id: string;
  restaurantId: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  reelUrl: string;
  platform: string; // Instagram, TikTok, etc.
  likes?: number;
  reach?: number;
  rewardId?: string;
  rewardClaimed: boolean;
  createdAt: string;
}

export interface ReviewSubmission {
  id: string;
  restaurantId: string;
  customerName?: string;
  customerPhone?: string;
  rating: number;
  comment: string;
  platform: string; // Google, Yelp, etc.
  rewardId?: string;
  rewardClaimed: boolean;
  createdAt: string;
}

export interface EngagementStats {
  totalScans: number;
  totalReels: number;
  totalReviews: number;
  totalRewardsClaimed: number;
  scansToday: number;
  reelsToday: number;
  reviewsToday: number;
  rewardsClaimedToday: number;
  engagementRate: number; // Percentage
}

