import arcjet, { shield, detectBot, tokenBucket } from "arcjet";
import { ARCJET_KEY } from "./env";

if (!ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined in environment variables");
}

export const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});
