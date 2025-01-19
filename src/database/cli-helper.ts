/* eslint-disable no-console */
import "dotenv/config";
import { prompt } from "enquirer";

import { migrateDatabase } from "./migrate";

const main = async (): Promise<void> => {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  const databaseUrl = process.env.DATABASE_URL;

  if (nodeEnv !== "development") {
    const result = await prompt<{ confirm: boolean }>({
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to run this script towards the ${nodeEnv} environment?`
    });
    if (!result.confirm) {
      process.exit(0);
    }
  }
  const command = process.argv[2];

  if (!command || (command !== "seed" && command !== "migrate")) {
    console.error("Please provide a command: seed or migrate");
    process.exit(1);
  }

  if (command === "migrate") {
    await migrateDatabase(databaseUrl);
  }

  process.exit();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
