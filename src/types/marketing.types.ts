/**
 * Marketing Automation Type Definitions
 */

export enum CampaignType {
  WHATSAPP = 'whatsapp',
  SMS = 'sms',
  EMAIL = 'email',
  PUSH = 'push',
  INSTAGRAM = 'instagram',
}

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface MarketingCampaign {
  id: string;
  restaurantId: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  targetSegment?: string; // Customer segment ID
  message: string;
  mediaUrl?: string;
  scheduledAt?: string;
  sentAt?: string;
  recipients: number;
  delivered: number;
  opened: number;
  clicked: number;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCode {
  id: string;
  restaurantId: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  validFrom: string;
  validUntil: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralCampaign {
  id: string;
  restaurantId: string;
  name: string;
  referrerReward: {
    type: 'points' | 'discount' | 'cashback';
    value: number;
  };
  refereeReward: {
    type: 'points' | 'discount' | 'cashback';
    value: number;
  };
  totalReferrals: number;
  activeReferrals: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

