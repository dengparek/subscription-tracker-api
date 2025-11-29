import mongoose from "mongoose";
import { NODE_ENV, MONGO_URI } from "../config/env";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: NODE_ENV === "production" ? "dura_prod" : "dura_dev",
      autoIndex: true, // recommended for development; turn off in prod if needed
    });

    console.log(`MongoDB connected in (${NODE_ENV}) mode`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
