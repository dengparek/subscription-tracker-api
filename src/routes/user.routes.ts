import router from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.controller.js";

import { Authorise } from "../middlewares/auth.middleware.js";

const userRouter = router();
userRouter.get("/", Authorise, getAllUsers);

userRouter.get("/:id", Authorise, getSingleUser);

export default userRouter;
