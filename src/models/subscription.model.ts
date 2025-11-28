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
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["sports", "news", "entertainment", "education", "technology"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "pending", "expired"],
      default: "pending",
      required: true,
    },
    startDate: {
      type: Date,
      default: () => new Date(),
      required: true,
      validate: {
        validator: function (this: ISubscription, value: Date) {
          return !this.endDate || value < this.endDate;
        },

        message: "Start date must be earlier than end date",
      } as any,
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
