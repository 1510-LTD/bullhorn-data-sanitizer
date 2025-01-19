import { relations, sql } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  note: text("note"), // to keep special note regarding the user
  email: text("email").notNull().unique(),
  dailyMailingLimit: integer("daily_mailing_limit").notNull(),
  monthlyMailingLimit: integer("monthly_mailing_limit").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdById: uuid("created_by_id").references((): AnyPgColumn => users.id),
  updatedById: uuid("updated_by_id").references((): AnyPgColumn => users.id),
  senderEmails: jsonb("sender_emails").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true, precision: 3 })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true, precision: 3 })
    .notNull()
    .default(sql`now()`)
    .$onUpdate(() => sql`now()`)
});

export const usersRelations = relations(users, ({ one }) => ({
  createdBy: one(users, {
    fields: [users.createdById],
    references: [users.id],
    relationName: "created_by"
  }),
  updatedBy: one(users, {
    fields: [users.updatedById],
    references: [users.id],
    relationName: "updated_by"
  })
}));

export const UsersDbSchema = {
  create: createInsertSchema(users).extend({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    email: z.string().email(),
    senderEmails: z.array(z.string().email()),
    dailyMailingLimit: z.coerce.number().int().positive(),
    monthlyMailingLimit: z.coerce.number().int().positive()
  }),
  read: createSelectSchema(users).extend({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    senderEmails: z.array(z.string().email())
  })
};

export namespace DbUser {
  export type Insert = z.infer<typeof UsersDbSchema.create>;
  export type Select = z.infer<typeof UsersDbSchema.read>;
}
