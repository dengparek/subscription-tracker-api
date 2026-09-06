import { app } from "../index";
import { connectDB } from "../database/db";

let dbConnected = false;

export default async function handler(req: any, res: any) {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }

  return app(req, res);
}
