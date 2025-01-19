import { AuthAccessType } from "@/database/schema";
import { AuthResourcesType } from "../../modules/authRule/AuthRoleSchema";
import AuthRoleService from "../../modules/authRule/AuthRoleService";
import { AuthorizationError } from "../errors";
import { generateUuidV5 } from "../utils";

export const hasAccess = async (
  userId: string,
  resource: AuthResourcesType,
  permission: AuthAccessType
): Promise<boolean> => {
  const roles = await AuthRoleService.getUserRoles(userId, resource);

  let hasAccess = false;

  for (const role of roles) {
    const accessType = role.permissions[resource];
    if (accessType && accessType >= permission) hasAccess = true;

    // if any explicit block is found, return false
    if (accessType === AuthAccessType.BLOCKED) return false;
  }

  return hasAccess;
};

export const authorize = async (
  email: string,
  resource: AuthResourcesType,
  permission: AuthAccessType
) => {
  const id = generateUuidV5(email);
  const access = await hasAccess(id, resource, permission);

  if (!access) {
    throw new AuthorizationError(`Unauthorized access to ${resource}`);
  }
};
