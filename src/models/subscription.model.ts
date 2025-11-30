import { Schema, model, Document, Model } from "mongoose";
import { ISubscription } from "../interfaces/tsInterface";

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
      default: "active",
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

    renewalDate: {
      type: Date,
      default: () => new Date(),
      validate: {
        validator: function (this: ISubscription, value: Date) {
          return value > this.startDate;
        },
        message: "Renewal date must be later than start date",
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
  if (!this.renewalDate) {
    const renewalPeriods = {
      monthly: 30,
      yearly: 365 | 366,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // auto-update status to expired if endDate has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});
