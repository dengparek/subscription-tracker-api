import { NextFunction, Request, Response } from "express";
import { aj } from "../config/arcjet";
import type { ArcjetAdapterContext } from "@arcjet/node";
import type { ArcjetNodeRequest } from "@arcjet/node";

export function buildArcjetContext(req: Request): ArcjetAdapterContext {
  const ctx: ArcjetNodeRequest = {
    getBody: () => req.body,
    getHeader: (name: string) => {
      const val = req.headers[name.toLowerCase()];
      if (Array.isArray(val)) return val.join(", ");
      return val?.toString();
    },
    getIp: () =>
      req.ip || (req.headers["x-forwarded-for"] as string | undefined),
    getMethod: () => req.method,
    getPath: () => req.originalUrl || req.url,
    getQuery: () => req.query,
    getCookie: (name: string) => {
      // depends on cookie parser middleware
      return (req as any).cookies?.[name] ?? undefined;
    },
    // include custom fields you want Arcjet to see
    userId: (req as any)?.user?._id ?? undefined,
  };

  // Assert to ArcjetAdapterContext to satisfy TypeScript if there are tiny differences.
  // return ctx as unknown as ArcjetAdapterContext;
}

export const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ctx = buildArcjetContext(req);

    const decision = await aj.protect(ctx, {
      userId: req.user?._id,
      ip: req.ip,
      method: req.method,
      path: req.originalUrl,
      headers: req.headers,
      requested: 1,
    });
    // const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ Error: "Rate Limite Exceeded" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ Error: "Bot Detected" });
      }
      return res.status(403).json({ Error: "Acess Denied" });
    }
    next();
  } catch (error) {
    console.log(`Arcjet middleware Error: ${(error as any).message}`);
    next(error);
  }
};
