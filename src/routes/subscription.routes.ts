const subscriptionRouter = require("express").Router();
import {
  cancelSubscription,
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
} from "../controllers/subscription.controller";
import { Authorise } from "../middlewares/auth.middleware";

subscriptionRouter.get("/", Authorise, getAllSubscriptions);

subscriptionRouter.get("/:id", Authorise, getSingleSubscription);

subscriptionRouter.post("/", Authorise, createSubscription);

subscriptionRouter.delete("/:id", Authorise, cancelSubscription);

subscriptionRouter.put("/:id", Authorise, updateSubscription);

export default subscriptionRouter;
