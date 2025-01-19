import { SQL, and, eq, getTableColumns, sql } from "drizzle-orm";

import {
  AuthAccessType,
  AuthResourcesType,
  AuthRole,
  AuthRolePermission,
  CreateAuthRole
} from "./AuthRoleSchema";
import { alias } from "drizzle-orm/pg-core";
import { NotFoundError } from "../../libraries/errors";
import { DbOrTransactionType, UserMeta } from "@/app/app-types";
import { authRoles, users } from "@/database/schema";
import { db } from "@/database/db";
import { usersAuthRoles } from "@/database/schema/usersAuthRoles";

const createAuthRole = async (
  payload: CreateAuthRole,
  userMeta: UserMeta
): Promise<AuthRole> => {
  const [createdRole] = await db
    .insert(authRoles)
    .values({ ...payload, createdById: userMeta.id, updatedById: userMeta.id })
    .returning();

  return createdRole as AuthRole;
};

const updateAuthRole = async (
  id: string,
  payload: CreateAuthRole,
  userMeta: UserMeta
): Promise<AuthRole> => {
  const [role] = await db
    .update(authRoles)
    .set({ ...payload, updatedById: userMeta.id })
    .where(eq(authRoles.id, id))
    .returning();
  if (!role) throw new NotFoundError("Role not found");

  return role as AuthRole;
};

const getAuthRoleSelectQuery = (tx: DbOrTransactionType = db) => {
  const updatedByUser = alias(users, "updatedByUser");
  const createdByUser = alias(users, "createdByUser");

  return tx
    .select({
      ...getTableColumns(authRoles),
      permissions: sql<AuthRolePermission>`${authRoles.permissions}::jsonb`,
      createdBy: {
        id: createdByUser.id,
        firstName: createdByUser.firstName,
        lastName: createdByUser.lastName,
        email: createdByUser.email
      },
      updatedBy: {
        id: updatedByUser.id,
        firstName: updatedByUser.firstName,
        lastName: updatedByUser.lastName,
        email: updatedByUser.email
      },
      assignedUserCount:
        sql`(SELECT COUNT(*) FROM ${usersAuthRoles} WHERE ${usersAuthRoles.roleId} = ${authRoles.id})`.mapWith(
          Number
        )
    })
    .from(authRoles)
    .innerJoin(createdByUser, eq(authRoles.createdById, createdByUser.id))
    .innerJoin(updatedByUser, eq(authRoles.updatedById, updatedByUser.id));
};

const getAuthRole = async (id: string): Promise<AuthRole> => {
  const [role] = await getAuthRoleSelectQuery().where(eq(authRoles.id, id));
  return role;
};

const getAuthRoles = async (): Promise<AuthRole[]> => {
  const roles = await getAuthRoleSelectQuery();
  return roles;
};

const assignRoleToUser = async (
  userId: string,
  roleId: string,
  userMeta: UserMeta
) => {
  return await db
    .insert(usersAuthRoles)
    .values({ userId, roleId, createdById: userMeta.id })
    .onConflictDoNothing();
};

const removeRoleFromUser = async (userId: string, roleId: string) => {
  return await db
    .delete(usersAuthRoles)
    .where(
      and(eq(usersAuthRoles.userId, userId), eq(usersAuthRoles.roleId, roleId))
    );
};

const deleteAuthRole = async (id: string) => {
  return await db.delete(authRoles).where(eq(authRoles.id, id));
};

const getUserRoles = async (
  userId: string,
  resource?: AuthResourcesType,
  accessType?: AuthAccessType
) => {
  const whereConditions: SQL[] = [];

  whereConditions.push(sql`user_id = ${userId}`);
  if (resource) {
    whereConditions.push(
      sql`(permissions::jsonb -> ${resource})::integer IS NOT NULL`
    );
    if (accessType)
      whereConditions.push(
        sql`(permissions::jsonb -> ${resource})::integer >= ${accessType}`
      );
  }

  const roles = await getAuthRoleSelectQuery()
    .innerJoin(usersAuthRoles, eq(usersAuthRoles.roleId, authRoles.id))
    .where(sql.join(whereConditions, sql` AND `));
  return roles;
};

const AuthRoleRepository = {
  createAuthRole,
  updateAuthRole,
  getAuthRole,
  getAuthRoles,
  deleteAuthRole,
  getUserRoles,
  assignRoleToUser,
  removeRoleFromUser
};

export default AuthRoleRepository;
