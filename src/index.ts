const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

import { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";

import errorMiddleware from "./middlewares/error.middleware";

// dotenv.config({ path: "./.env.development.local" });

export const app = express();

const articles: { title: string; url: string }[] = [];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/news", (req: Request, res: Response) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response: any) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains("climate")', html).each(function (this: any) {
        const title = $(this).text().trim();
        const url = $(this).attr("href");
        articles.push({ title, url });
      });
      res.json(articles);
    })
    .catch((error: any) => {
      res.status(500).json({ error: "Error fetching news data" });
    });
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const fetch = await axios.get(
      "https://www.theguardian.com/environment/climate-crisis"
    );
  } catch (e: any) {}
});

// const port = process.env.PORT || 8080;
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
