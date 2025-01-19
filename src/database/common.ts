import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./schema/user.db";

export const createdAt = timestamp("created_at", {
  withTimezone: true,
  precision: 3
})
  .notNull()
  .default(sql`now()`);

export const updatedAt = timestamp("updated_at", {
  withTimezone: true,
  precision: 3
})
  .notNull()
  .default(sql`now()`);

export const createUpdateTimeFields = {
  createdAt,
  updatedAt
};

export const creationMetaFields = {
  createdAt,
  createdById: uuid("created_by_id")
    .notNull()
    .references(() => users.id)
};

export const updateMetaFields = {
  updatedAt,
  updatedById: uuid("updated_by_id")
    .notNull()
    .references(() => users.id)
};

export const createUpdateUserMetaFields = {
  ...creationMetaFields,
  ...updateMetaFields
};

export enum OnUpdateDeleteAction {
  CASCADE = "cascade",
  RESTRICT = "restrict",
  NOACTION = "no action",
  SETNULL = "set null",
  SETDEFAULT = "set default"
}
