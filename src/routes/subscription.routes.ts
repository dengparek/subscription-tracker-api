const subscriptionRouter = require("express").Router();
import { Request, Response } from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
} from "../controllers/subscription.controller";
import { Authorise } from "../middlewares/auth.middleware";

subscriptionRouter.get("/", Authorise, getAllSubscriptions);

subscriptionRouter.get("/:id", Authorise, getSingleSubscription);

subscriptionRouter.post("/", Authorise, createSubscription);

subscriptionRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete a subscription");
});

subscriptionRouter.put("/:id", Authorise, updateSubscription);

export default subscriptionRouter;
