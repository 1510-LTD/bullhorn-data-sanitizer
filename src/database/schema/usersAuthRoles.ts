import { uuid, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { authRoles } from "./auth-role.db";
import { users } from "./user.db";
import { creationMetaFields, OnUpdateDeleteAction } from "../common";

export const usersAuthRoles = pgTable(
  "users_auth_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: OnUpdateDeleteAction.CASCADE
      }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => authRoles.id, {
        onDelete: OnUpdateDeleteAction.CASCADE
      }),
    ...creationMetaFields
  },
  (t) => {
    return {
      pkWithCustomName: primaryKey({
        name: "user_auth_role_pk",
        columns: [t.userId, t.roleId]
      })
    };
  }
);
