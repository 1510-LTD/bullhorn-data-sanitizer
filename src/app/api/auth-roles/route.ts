import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "../_components/libraries/responseHandler";
import { getUserMeta } from "../_components/libraries/utils";
import { validateRequest } from "../_components/libraries/validator";
import { NextRequest } from "next/server";
import AuthRoleService from "../_components/modules/authRule/AuthRoleService";
import { AuthRoleSchema } from "../_components/modules/authRule/AuthRoleSchema";
import { authorize } from "../_components/libraries/authorization/acl";
import { AuthAccessType } from "@/database/schema";
import { getLoggedInUserEmail } from "../_components/libraries/authentication";

export async function GET(request: NextRequest) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);

    await authorize(loggedInEmail, "auth_roles", AuthAccessType.READER);
    const users = await AuthRoleService.getAuthRoles();
    return sendSuccessResponse({ data: users });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);

    await authorize(loggedInEmail, "auth_roles", AuthAccessType.ADMIN);
    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: AuthRoleSchema.create,
        data: body
      }
    });

    if (errors) return sendValidationErrors(errors);

    const userMeta = getUserMeta(loggedInEmail);
    const user = await AuthRoleService.createAuthRole(data.body, userMeta);
    return sendSuccessResponse({ data: user });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
