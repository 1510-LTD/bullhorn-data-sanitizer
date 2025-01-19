import { UserMeta } from "@/app/app-types";
import { CreateUser, UpdateUser } from "./UserSchema";
import UserRepository from "./UserRepository";
import { generateUuidV5 } from "../../libraries/utils";
import { NotFoundError } from "../../libraries/errors";

const createUser = async (payload: CreateUser, userMeta: UserMeta) => {
  const user = await UserRepository.createUser(payload, userMeta);
  return user;
};

const updateUser = async (
  id: string,
  payload: UpdateUser,
  userMeta: UserMeta
) => {
  const user = await UserRepository.updateUser(id, payload, userMeta);
  return user;
};

const getUser = async (id: string) => {
  const user = await UserRepository.getUser(id);
  if (!user) throw new NotFoundError(`User with id ${id} does not exist!`);

  return user;
};

const getUserByEmail = async (email: string) => {
  const userId = generateUuidV5(email);
  const user = await getUser(userId);
  if (!user)
    throw new NotFoundError(`User with email ${email} does not exist!`);
  return user;
};

const getUsers = async () => {
  const users = await UserRepository.getUsers();
  return users;
};

const deleteUser = async (id: string) => {
  const isDeleted = await UserRepository.deleteUser(id);
  return isDeleted;
};

const UserService = {
  createUser,
  updateUser,
  getUser,
  getUserByEmail,
  getUsers,
  deleteUser
};
export default UserService;
