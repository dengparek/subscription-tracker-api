import { Login, SignUp, LogOut } from "../controllers/auth.controller.js";
import Router from "express";
const authRouter = Router();
authRouter.post("/login", Login);

authRouter.post("/sign-up", SignUp);

authRouter.post("/logout", LogOut);

export default authRouter;
