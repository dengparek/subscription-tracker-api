import dotenv from "dotenv";
import path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production.local"
    : ".env.development.local";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || "5000"; // keep string here
export const MONGO_URI = process.env.MONGO_URI;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const ARCJET_KEY = process.env.ARCJET_KEY;
export const ARCJET_ENV = process.env.ARCJET_ENV;

console.log(`Loaded ${envFile} environment`);
