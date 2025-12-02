import { Schema, model, Model } from "mongoose";
import { ISubscription } from "../interfaces/tsInterface.js";

//Mongoose schema for subscriptions

const subscriptionSchema = new Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [100, "Name must be at most 100 characters"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
      required: true,
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
      enum: ["inactive", "active", "cancelled", "expired"],
      default: "active",
      required: true,
    },
    startDate: {
      type: Date,
      default: () => new Date(),
      required: true,
    },

    renewalDate: {
      type: Date,
      default: () => new Date(),
    },

    endDate: {
      type: Date,
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

// Instance methods

subscriptionSchema.methods.isActive = function (): boolean {
  return (
    this.status === "active" && (!this.endDate || this.endDate > new Date())
  );
};

export const Subscription: Model<ISubscription> = model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
export default Subscription;

// auto-calculate renewalDateif missing  before saving

subscriptionSchema.pre<ISubscription>("save", function (next: any) {
  const now = new Date();

  // Auto-calculate renewalDate if missing
  if (!this.renewalDate) {
    const start = new Date(this.startDate);
    if (this.frequency === "monthly") {
      this.renewalDate = new Date(start.setMonth(start.getMonth() + 1));
    } else if (this.frequency === "yearly") {
      this.renewalDate = new Date(start.setFullYear(start.getFullYear() + 1));
    }
  }

  // Auto-set endDate if missing
  if (!this.endDate) {
    this.endDate = new Date(this.renewalDate);
  }

  // Auto-expire if renewalDate has passed
  if (this.renewalDate < now) {
    this.status = "expired";
  }

  next();
});
