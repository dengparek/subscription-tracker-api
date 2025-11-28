const userRouter = require("express").Router();

import { Request, Response } from "express";

userRouter.get("/", (req: Request, res: Response) => {
  res.send("Get all users");
});

userRouter.get("/:id", (req: Request, res: Response) => {
  res.send("Get a single user");
});

userRouter.post("/", (req: Request, res: Response) => {
  res.send("Create a user");
});

export default userRouter;
