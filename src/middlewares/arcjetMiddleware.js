import { aj } from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    // console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res
          .status(429, { "Content-Type": "application/json" })
          .json({ Error: "Too Many Requests. Rate Limit Exceeded" });
      }

      // if (decision.reason.isBot()) {
      //   res.status(403, { "Content-Type": "application/json" }).json({
      //     Error: "Bot Detected, access is denied",
      //   });
      // }
    } else if (decision.ip.isHosting() || decision.results.some(isSpoofedBot)) {
      res
        .status(403, { "Content-Type": "application/json" })
        .json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
