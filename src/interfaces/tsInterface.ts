import { NextFunction } from "express";
import { Document, Types } from "mongoose";

export type Plan = "free" | "basic" | "premium";
export type SubscriptionStatus =
  | "inactive"
  | "active"
  | "cancelled"
  | "expired";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface ISubscription extends Document {
  name: string;
  user: Types.ObjectId | string;
  email: string;
  plan: Plan;
  price: number;
  frequency: "monthly" | "yearly";
  category: "sports" | "news" | "entertainment" | "education" | "technology";
  currency: "USD" | "EUR" | "GBP";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer";
  status: SubscriptionStatus;
  startDate: Date;
  renewalDate: Date;
  endDate: Date | null;
  subscriptionId: string;
  metadata: Record<string, unknown>;
  // convenience helpers (optional)
  isActive(): boolean;
  next: NextFunction;
}

export type UserRole = "user" | "admin" | "superAdmin";
export type UserStatus = "active" | "inactive" | "pending" | "banned";

export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole[];
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

export default class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Restore prototype chain for TS/Node env
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
