import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";
import AppError from "../interfaces/tsInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new AppError("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
          role: req.body.role,
        },
      ],
      { session }
    );

    if (!JWT_SECRET) {
      throw new AppError("JWT_SECRET is missing from environment variables");
    }

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET!, {
      expiresIn: 3600,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new AppError("Invalid email or password");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (user as any).password
    );
    if (!isPasswordValid) {
      const error = new AppError("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: (user as any)._id }, JWT_SECRET!, {
      expiresIn: 3600,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const LogOut = (req: Request, res: Response) => {};
