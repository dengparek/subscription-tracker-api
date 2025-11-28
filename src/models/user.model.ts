import mongoose, { Schema, Document, Model } from "mongoose";

import { IUser } from "../interfaces/tsInterface";

// interface IUserDocument extends IUser, Document {}

// creating user schema
const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
