import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import createRemoteClient from "arcjet";
import { ARCJET_KEY } from "./env";
import fetch from "node-fetch";

if (!ARCJET_KEY) {
  throw new Error("ARCJET_KEY is not defined in environment variables");
}

const logger: any = {
  debug: console.log,
  info: console.log,
  warn: console.warn,
  error: console.error,
};
// const client = createRemoteClient({ fetch });

export const aj = arcjet({
  key: ARCJET_KEY,
  client: fetch as any,
  // client,

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
  log: logger,
});
