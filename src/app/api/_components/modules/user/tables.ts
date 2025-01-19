import { users } from "@/database/schema";
import { alias } from "drizzle-orm/pg-core";

export const createdByUser = alias(users, "createdByUser");
export const updatedByUser = alias(users, "updatedByUser");

export const usersJoinTables = [users, createdByUser, updatedByUser];
