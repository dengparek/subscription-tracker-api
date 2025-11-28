const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const cors = require("cors");
import { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";
// import * as cheerio from "cheerio";

dotenv.config({ path: "./.env.development.local" });

const app = express();

const articles: { title: string; url: string }[] = [];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

const user = {
  name: "Parek",
  age: 25,
  city: "New York",
};
app.get("/user", (req: Request, res: Response) => {
  console.log("Hello World");
  res.json(user);
});

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

// app.get("/newspaper", async (req: Request, res: Response) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto("https://www.theguardian.com/environment/climate-crisis", {
//       waitUntil: "networkidle2", // wait for JS-rendered data
//     });

//     const articles = await page.evaluate(() => {
//       const results: { title: string; url: string }[] = [];

//       document.querySelectorAll("a").forEach((link) => {
//         const text = link.textContent?.toLowerCase() || "";
//         if (text.includes("climate")) {
//           results.push({
//             title: link.textContent?.trim() || "",
//             url: link.href,
//           });
//         }
//       });

//       return results;
//     });

//     await browser.close();
//     res.json(articles);
//   } catch (e) {
//     res.status(500).json({ error: "Error scraping news" });
//   }
// });

app.get("/", async (req: Request, res: Response) => {
  try {
    const fetch = await axios.get(
      "https://www.theguardian.com/environment/climate-crisis"
    );
  } catch (e: any) {}
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
