import UserService from "../../_components/modules/user/UserService";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "../../_components/libraries/responseHandler";
import { validateRequest } from "../../_components/libraries/validator";
import { UserSchema } from "../../_components/modules/user/UserSchema";
import { getUserMeta } from "../../_components/libraries/utils";
import { ParamsSchema } from "@/app/app-types/schema";
import { NextRequest } from "next/server";
import { AuthAccessType } from "@/database/schema";
import { authorize } from "../../_components/libraries/authorization/acl";
import { getLoggedInUserEmail } from "../../_components/libraries/authentication";

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { data, errors } = validateRequest({
      params: {
        schema: ParamsSchema.Id,
        data: context.params
      }
    });

    if (errors) return sendValidationErrors(errors);

    const users = await UserService.getUser(data.params.id);
    return sendSuccessResponse({ data: users });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);

    await authorize(loggedInEmail, "users", AuthAccessType.EDITOR);
    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: UserSchema.update,
        data: body
      },
      params: {
        schema: ParamsSchema.Id,
        data: context.params
      }
    });
    if (errors) return sendValidationErrors(errors);

    const userMeta = getUserMeta(loggedInEmail);
    const user = await UserService.updateUser(
      data.params.id,
      data.body,
      userMeta
    );
    return sendSuccessResponse({ data: user });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);

    await authorize(loggedInEmail, "users", AuthAccessType.READER);
    const { data, errors } = validateRequest({
      params: {
        schema: ParamsSchema.Id,
        data: context.params
      }
    });

    if (errors) {
      return sendValidationErrors(errors);
    }

    await UserService.deleteUser(data.params.id);
    return sendSuccessResponse({ statusCode: 204 });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
