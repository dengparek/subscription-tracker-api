const userRouter = require("express").Router();
import { getAllUsers, getSingleUser } from "../controllers/user.controller";

import { Authorise } from "../middlewares/auth.middleware";

userRouter.get("/", Authorise, getAllUsers);

userRouter.get("/:id", Authorise, getSingleUser);

export default userRouter;
