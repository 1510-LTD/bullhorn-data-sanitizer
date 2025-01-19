import { z } from "zod";

import { UserMinimumReadSchema } from "./user.schema";
import {
  AuthAccessType,
  AuthResources,
  AuthRolesDbSchema,
  PermissionSchema
} from "@/database/schema";

export const AuthRoleSchema = {
  create: AuthRolesDbSchema.create.omit({
    id: true,
    createdAt: true,
    createdById: true,
    updatedAt: true,
    updatedById: true
  }),
  update: AuthRolesDbSchema.create.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    createdById: true,
    updatedById: true
  }),
  read: AuthRolesDbSchema.read.extend({
    createdBy: UserMinimumReadSchema,
    updatedBy: UserMinimumReadSchema,
    assignedUserCount: z.number().optional()
  })
};

export type AuthResourcesType = (typeof AuthResources)[number];
export { AuthAccessType };
export type AuthRolePermission = z.infer<typeof PermissionSchema>;

export type AuthRole = z.infer<typeof AuthRoleSchema.read>;
export type CreateAuthRole = z.infer<typeof AuthRoleSchema.create>;
export type UpdateAuthRole = z.infer<typeof AuthRoleSchema.update>;
