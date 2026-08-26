import { Response, Request } from "express";
import AppError from "../interfaces/tsInterface";

export const NotFound = (req: Request, res: Response) => {
  res.json("IT'S AN INVALID ROUTE");
  const error = new AppError("OOPs, Nothing Found ");
  throw error;
};
