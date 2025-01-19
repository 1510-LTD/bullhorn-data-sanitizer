import { UsersDbSchema } from "@/database/schema";
import { z } from "zod";

export const UserSchema = {
  create: UsersDbSchema.create.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  }),
  read: UsersDbSchema.read,
  update: UsersDbSchema.create.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })
};

export const UserMinimumReadSchema = UsersDbSchema.read.pick({
  id: true,
  firstName: true,
  lastName: true,
  email: true
});

export type UserBase = z.infer<typeof UserMinimumReadSchema>;
export type User = z.infer<typeof UserSchema.read>;
export type CreateUser = z.infer<typeof UserSchema.create>;
export type UpdateUser = z.infer<typeof UserSchema.update>;
