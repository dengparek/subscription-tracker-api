const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";

import errorMiddleware from "./middlewares/error.middleware";
// import { arcjetMiddleware } from "./middlewares/arcjet.middleware";
// import { buildArcjetContext } from "./middlewares/testarcjetmiddleware";

export const app = express();

const articles: { title: string; url: string }[] = [];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
// app.use(arcjetMiddleware);
// app.set("trust proxy", true);
// app.use(buildArcjetContext);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);
