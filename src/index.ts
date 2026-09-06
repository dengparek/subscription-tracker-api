import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjetMiddleware.js";

export const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//api protection
app.use(arcjetMiddleware);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("health", (res, req) => {
  console.log("Okay");
});

// Error handling
app.use(errorMiddleware);
