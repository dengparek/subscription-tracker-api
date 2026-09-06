import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjetMiddleware.js";
import { NODE_ENV, PORT } from "./config/env.js";
import { connectDB } from "./database/db.js";

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

// Error handling
app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server started successfully on port:${PORT} in ${NODE_ENV} mode`,
      );

      console.log(`Server running at port:${PORT} in ${NODE_ENV} mode`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB: " + err.message);
  });

export default app;
