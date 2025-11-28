const subscriptionRouter = require("express").Router();
import { Request, Response } from "express";

subscriptionRouter.get("/", (req: Request, res: Response) => {
  res.send("Get all subscriptions");
});

subscriptionRouter.get("/:id", (req: Request, res: Response) => {
  res.send("Get a single subscription");
});

subscriptionRouter.post("/", (req: Request, res: Response) => {
  res.send("Create a subscription");
});

subscriptionRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete a subscription");
});

subscriptionRouter.put("/:id", (req: Request, res: Response) => {
  res.send("Update a subscription");
});

export default subscriptionRouter;
