import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import AppError from "../interfaces/tsInterface";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Allow only admin or superAdmin
    if (
      !req.user ||
      (!req.user.role?.includes("admin") &&
        !req.user.role?.includes("superAdmin"))
    ) {
      const error = new AppError(
        "You are not authorized to access user details"
      );
      error.statusCode = 403;
      throw error;
    }

    const users = await User.find();
    if (!users) {
      const error = new AppError("No users found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    // Allow only admin or superAdmin
    if (
      !req.user ||
      (!req.user.role?.includes("admin") &&
        !req.user.role?.includes("superAdmin"))
    ) {
      const error = new AppError(
        "You are not authorized to access user details"
      );
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      const error = new AppError("No user found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
