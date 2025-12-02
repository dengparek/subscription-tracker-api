import Router from "express";

import {
  cancelSubscription,
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import { Authorise } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", Authorise, getAllSubscriptions);

subscriptionRouter.get("/:id", Authorise, getSingleSubscription);

subscriptionRouter.post("/", Authorise, createSubscription);

subscriptionRouter.delete("/:id", Authorise, cancelSubscription);

subscriptionRouter.put("/:id", Authorise, updateSubscription);

export default subscriptionRouter;
