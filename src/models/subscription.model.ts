import { Schema, model, Document, Model } from "mongoose";
import { ISubscription } from "../interfaces/tsInterface";
/**
 * Mongoose schema for subscriptions
 */
const subscriptionSchema = new Schema<ISubscription>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "pending"],
      default: "pending",
      required: true,
    },
    startDate: {
      type: Date,
      default: () => new Date(),
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    subscriptionId: {
      type: String,
      index: true,
      sparse: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Instance methods
 */
subscriptionSchema.methods.isActive = function (): boolean {
  return (
    this.status === "active" && (!this.endDate || this.endDate > new Date())
  );
};

/**
 * Model export
 */
export const Subscription: Model<ISubscription> = model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
export default Subscription;
