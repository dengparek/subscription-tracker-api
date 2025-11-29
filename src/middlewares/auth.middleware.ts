import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/env";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const Authorise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET!);
    const user = await User.findById((decoded as any).userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: (error as any).message,
    });
  }
};
