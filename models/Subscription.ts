import { ObjectId } from 'mongodb';

export interface Subscription {
  _id?: ObjectId;
  clinicEmail: string;
  plan: '1-month' | '3-month' | '12-month';
  price: number;
  status: 'active' | 'cancelled' | 'expired';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export const SUBSCRIPTION_PLANS = {
  '1-month': {
    name: '1 Month',
    price: 10,
    interval: 'month' as const,
    intervalCount: 1,
  },
  '3-month': {
    name: '3 Months',
    price: 30,
    interval: 'month' as const,
    intervalCount: 3,
  },
  '12-month': {
    name: '12 Months',
    price: 79,
    interval: 'month' as const,
    intervalCount: 12,
    savings: 41, // €120 - €79 = €41 savings
  },
} as const;
