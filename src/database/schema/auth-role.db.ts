import { boolean, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { createUpdateUserMetaFields } from "../common";

export const AuthResources = [
  "users",
  "auth_roles",
  "candidates",
  "contacts",
  "email_templates",
  "emails"
] as const;

export enum AuthAccessType {
  ADMIN = 3,
  EDITOR = 2,
  READER = 1,
  BLOCKED = 0
}

export const PermissionSchema = z.record(
  z.enum(AuthResources),
  z.union([
    z.literal(AuthAccessType.BLOCKED),
    z.literal(AuthAccessType.READER),
    z.literal(AuthAccessType.EDITOR),
    z.literal(AuthAccessType.ADMIN)
  ])
);

export const authRoles = pgTable("auth_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  permissions: jsonb("permissions").notNull(),
  isActive: boolean("is_active").default(true),
  ...createUpdateUserMetaFields
});

export const AuthRolesDbSchema = {
  create: createInsertSchema(authRoles).extend({
    permissions: PermissionSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  }),
  read: createSelectSchema(authRoles).extend({
    permissions: PermissionSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  })
};

export namespace DbAuthRole {
  export type Insert = z.infer<typeof AuthRolesDbSchema.create>;
  export type Select = z.infer<typeof AuthRolesDbSchema.read>;
}
