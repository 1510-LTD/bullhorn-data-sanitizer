import { getLoggedInUserEmail } from "@/app/api/_components/libraries/authentication";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "@/app/api/_components/libraries/responseHandler";
import { getUserMeta } from "@/app/api/_components/libraries/utils";
import { validateRequest } from "@/app/api/_components/libraries/validator";
import AuthRoleService from "@/app/api/_components/modules/authRule/AuthRoleService";
import { ParamsSchema } from "@/app/app-types/schema";

import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: { id: string; userId: string } }
) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);

    const { errors, data } = validateRequest({
      params: {
        schema: ParamsSchema.Id.and(ParamsSchema.UserId),
        data: context.params
      }
    });
    if (errors) return sendValidationErrors(errors);

    const userMeta = getUserMeta(loggedInEmail);
    await AuthRoleService.assignRoleToUser(
      data.params.userId,
      data.params.id,
      userMeta
    );
    return sendSuccessResponse({ statusCode: 204 });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string; userId: string } }
) {
  try {
    const { errors, data } = validateRequest({
      params: {
        schema: ParamsSchema.Id.and(ParamsSchema.UserId),
        data: context.params
      }
    });
    if (errors) return sendValidationErrors(errors);

    await AuthRoleService.removeRoleFromUser(
      data.params.userId,
      data.params.id
    );
    return sendSuccessResponse({ statusCode: 204 });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
