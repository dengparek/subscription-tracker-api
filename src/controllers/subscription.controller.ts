import { NextFunction, Request, Response } from "express";
import Subscription from "../models/subscription.model";
import AppError from "../interfaces/tsInterface";

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const existingSubscription = await Subscription.findOne({
    user: (req.user as any)._id,
    status: { $nin: ["expired", "cancelled"] },
  });

  if (existingSubscription) {
    return res.status(400).json({
      success: false,
      message: "You already have an active subscription",
    });
  }
  const subscription = await Subscription.create({
    ...req.body,
    user: (req.user as any)._id,
  });
  res
    .status(201)
    .json({
      success: true,
      message: "Subscription Created Successfully",
      data: subscription,
    });
  try {
  } catch (error) {
    next(error);
  }
};

export const getSingleSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //   check if user  is the same as the one in the token
    if ((req.user as any).id != req.params.id) {
      const error = new AppError("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscription = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);
    if (!subscription)
      return res
        .status(404)
        .json({ success: false, message: "No Subscription found" });

    if (subscription.user.toString() !== (req.user as any).id) {
      return res
        .status(403)
        .json({ message: "You can only update your own subscription" });
    }

    const updated = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL (Admin Only)
export const getAllSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if ((req.user as any).role !== "superAdmin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admin only." });
    }

    const subscriptions = await Subscription.find();
    return res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
