import { UserSchema } from "../_components/modules/user/UserSchema";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "../_components/libraries/responseHandler";
import UserService from "../_components/modules/user/UserService";
import { getUserMeta } from "../_components/libraries/utils";
import { validateRequest } from "../_components/libraries/validator";
import { NextRequest } from "next/server";
import { authorize } from "../_components/libraries/authorization/acl";
import { AuthAccessType } from "@/database/schema";
import { getLoggedInUserEmail } from "../_components/libraries/authentication";

export async function GET(_request: NextRequest) {
  try {
    const users = await UserService.getUsers();
    return sendSuccessResponse({ data: users });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);
    await authorize(loggedInEmail, "users", AuthAccessType.ADMIN);
    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: UserSchema.create,
        data: body
      }
    });
    if (errors) return sendValidationErrors(errors);

    const userMeta = getUserMeta(loggedInEmail);
    const user = await UserService.createUser(data.body, userMeta);
    return sendSuccessResponse({ data: user });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
