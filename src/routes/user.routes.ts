const userRouter = require("express").Router();
import { getAllUsers, getSingleUser } from "../controllers/user.controller";

import { Request, Response } from "express";
import { Authorise } from "../middlewares/auth.middleware";

userRouter.get("/", Authorise, getAllUsers);

userRouter.get("/:id", Authorise, getSingleUser);

userRouter.post("/", (req: Request, res: Response) => {
  res.send("Create a user");
});

export default userRouter;
