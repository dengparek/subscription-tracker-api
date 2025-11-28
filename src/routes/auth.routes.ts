const authRouter = require("express").Router();

import { Request, Response } from "express";

authRouter.post("/login", (req: Request, res: Response) => {
  res.send("User logged in successfully");
});

authRouter.post("/sign-up", (req: Request, res: Response) => {
  res.send("User Created Successfully");
});

authRouter.put("/logout", (req: Request, res: Response) => {
  res.send("User logged out successfully");
});

export default authRouter;
