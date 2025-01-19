import { drizzle } from "drizzle-orm/node-postgres";
import Pool from "pg-pool";

import * as schemas from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

export const db = drizzle(pool, {
  schema: schemas,
  logger: process.env.LOG_ORM_QUERY === "1"
});

export type TypeOfDb = typeof db;
export type TypeOfDbSchema = typeof schemas;

export const closeConnection = () => pool.end();
