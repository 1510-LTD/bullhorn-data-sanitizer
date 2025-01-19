import "dotenv/config";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { sql } from "drizzle-orm";

import path from "path";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { stripPasswordFromDatabaseUrl } from "./utils";
import { logger } from "@/app/api/_components/libraries/logger";

export const migrateDatabase = async (databaseUrl: string | undefined) => {
  logger.info(`Migrating database`);
  if (!databaseUrl) {
    logger.error("DB migration: Database URL is not provided");
    throw new Error("Database URL is not provided");
  }

  const client = new Client({
    connectionString: databaseUrl
  });

  try {
    logger.info(
      `DB migration: Connecting to database: ${stripPasswordFromDatabaseUrl(
        databaseUrl
      )}`
    );
    await client.connect();
    const db = drizzle(client);

    const migrationsFolder = path.join(
      process.cwd(),
      "./src/database/drizzle/migrations"
    );
    logger.info(
      `DB migration: Migrating database using migrations folder: ${migrationsFolder}`
    );

    // Run migrations
    await migrate(db, { migrationsFolder });

    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    logger.info("DB migration: Done!");
  } catch (error) {
    logger.error("DB migration: Error migrating database:");
    logger.error(error);
    throw error;
  } finally {
    await client.end();
  }
};
