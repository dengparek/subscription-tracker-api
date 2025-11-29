import { Request, Response, NextFunction } from "express";
import AppError from "../interfaces/tsInterface";

const errorMiddleware = (
  err: unknown, // can be literally anything
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If error is unknown, convert to a safe structured version
  let error =
    err instanceof AppError
      ? err
      : err instanceof Error
      ? new AppError(err.message, 500)
      : new AppError("Unknown error occurred", 500);

  // 🔹 Handle Mongoose errors
  if ((err as any).name === "CastError") {
    error = new AppError("Resource not found");
    error.statusCode = 404;
  }

  if ((err as any).code === 11000) {
    error = new AppError("Duplicate field value entered");
    error.statusCode = 400;
  }

  if ((err as any).name === "ValidationError") {
    const message = Object.values((err as any).errors)
      .map((e: any) => e.message)
      .join(", ");
    error = new AppError(message);
    error.statusCode = 400;
  }

  // More errors can be added here as app grows...

  return res.status(error.statusCode || 500).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export default errorMiddleware;
