import { Login, SignUp, LogOut } from "../controllers/auth.controller";

const authRouter = require("express").Router();

authRouter.post("/login", Login);

authRouter.post("/sign-up", SignUp);

authRouter.post("/logout", LogOut);

export default authRouter;
