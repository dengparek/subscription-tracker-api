// import { Validator } from "mongoose";

import { ValidateFn } from "mongoose";

export type Plan = "free" | "basic" | "premium";
export type SubscriptionStatus = "active" | "cancelled" | "pending" | "expired";

export interface ISubscription extends Document {
  email: string;
  plan: Plan;
  price: number;
  frequency: "monthly" | "yearly";
  category: "sports" | "news" | "entertainment" | "education" | "technology";
  currency: "USD" | "EUR" | "GBP";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date | null;
  subscriptionId: string;
  metadata: Record<string, unknown>;
  // convenience helpers (optional)
  isActive(): boolean;
}

export type UserRole = "user" | "admin" | "superadmin";
export type UserStatus = "active" | "inactive" | "pending" | "banned";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  roles: UserRole[];
  status: UserStatus;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  lastLogin?: Date | null;
  stripeCustomerId?: string;
  subscriptions?: ISubscription[];

  // convenience helpers
  isActive(): boolean;
  canAccessPlan(plan: Plan): boolean;
  validatePassword(password: string): Promise<boolean>;
}
