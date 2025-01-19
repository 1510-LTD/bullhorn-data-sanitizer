import { DbOrTransactionType, UserMeta } from "@/app/app-types";
import { CreateUser, UpdateUser, User } from "./UserSchema";

import { generateUuidV5 } from "../../libraries/utils";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { createdByUser, updatedByUser } from "./tables";
import { users } from "@/database/schema";
import { db } from "@/database/db";

const getUserSelectQuery = (tx: DbOrTransactionType = db) => {
  return tx
    .select({
      ...getTableColumns(users),
      senderEmails: sql<string[]>`${users.senderEmails}`,
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
      }
    })
    .from(users)
    .leftJoin(createdByUser, eq(createdByUser.id, users.createdById))
    .leftJoin(updatedByUser, eq(updatedByUser.id, users.updatedById))
    .$dynamic();
};

const createUser = async (
  payload: CreateUser,
  userMeta: UserMeta
): Promise<User> => {
  const [user] = await db
    .insert(users)
    .values({
      ...payload,
      createdById: userMeta.id,
      id: generateUuidV5(payload.email)
    })
    .returning();

  return user as User;
};

const getUser = async (id: string): Promise<User> => {
  const [user] = await getUserSelectQuery().where(eq(users.id, id));
  return user;
};

const getUsers = async (): Promise<User[]> => {
  const users = await getUserSelectQuery();
  return users;
};

const updateUser = async (
  id: string,
  payload: UpdateUser,
  userMeta: UserMeta
): Promise<User> => {
  const [user] = await db
    .update(users)
    .set({
      ...payload,
      updatedById: userMeta.id,
      updatedAt: new Date()
    })
    .where(eq(users.id, id))
    .returning();

  return user as User;
};

const deleteUser = async (id: string): Promise<boolean> => {
  await db.delete(users).where(eq(users.id, id));
  return true;
};

const UserRepository = {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser
};
export default UserRepository;
