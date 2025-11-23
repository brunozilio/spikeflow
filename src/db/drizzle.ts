import { config } from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

config({ path: ".env" });

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const db = drizzle(DATABASE_URL);
