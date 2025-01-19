import AuthRoleRepository from "./AuthRoleRepository";
import {
  AuthAccessType,
  AuthResourcesType,
  CreateAuthRole
} from "./AuthRoleSchema";
import { NotFoundError } from "../../libraries/errors";
import { UserMeta } from "@/app/app-types";

const createAuthRole = async (payload: CreateAuthRole, userMeta: UserMeta) => {
  const role = await AuthRoleRepository.createAuthRole(payload, userMeta);
  return role;
};

const updateAuthRole = async (
  id: string,
  payload: CreateAuthRole,
  userMeta: UserMeta
) => {
  const role = await AuthRoleRepository.updateAuthRole(id, payload, userMeta);
  return role;
};

const getAuthRole = async (id: string) => {
  const role = await AuthRoleRepository.getAuthRole(id);
  if (!role) throw new NotFoundError(`Auth role with id ${id} not found.`);
  return role;
};

const getAuthRoles = async () => {
  const roles = await AuthRoleRepository.getAuthRoles();
  return roles;
};

const deleteAuthRole = async (id: string) => {
  const role = await getAuthRole(id);
  if (!role) throw new NotFoundError(`Auth role with id ${id} not found.`);
  await AuthRoleRepository.deleteAuthRole(id);
  return true;
};

const assignRoleToUser = async (
  userId: string,
  roleId: string,
  userMeta: UserMeta
) => {
  const item = await AuthRoleRepository.assignRoleToUser(
    userId,
    roleId,
    userMeta
  );
  return item;
};

const removeRoleFromUser = async (userId: string, roleId: string) => {
  const item = await AuthRoleRepository.removeRoleFromUser(userId, roleId);
  return item;
};

const getUserRoles = async (
  userId: string,
  resource?: AuthResourcesType,
  accessType?: AuthAccessType
) => {
  return await AuthRoleRepository.getUserRoles(userId, resource, accessType);
};

const AuthRoleService = {
  createAuthRole,
  updateAuthRole,
  getAuthRole,
  getAuthRoles,
  deleteAuthRole,
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles
};

export default AuthRoleService;
