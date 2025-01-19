import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "../../_components/libraries/responseHandler";
import { validateRequest } from "../../_components/libraries/validator";
import { getUserMeta } from "../../_components/libraries/utils";
import { ParamsSchema } from "@/app/app-types/schema";
import { NextRequest } from "next/server";
import { AuthRoleSchema } from "../../_components/modules/authRule/AuthRoleSchema";
import AuthRoleService from "../../_components/modules/authRule/AuthRoleService";
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

    if (errors) {
      return sendValidationErrors(errors);
    }

    const users = await AuthRoleService.getAuthRole(data.params.id);
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
    const body = await request.json();
    const loggedInEmail = await getLoggedInUserEmail(request);

    const { errors, data } = validateRequest({
      body: {
        schema: AuthRoleSchema.update,
        data: body
      },
      params: {
        schema: ParamsSchema.Id,
        data: context.params
      }
    });
    if (errors) return sendValidationErrors(errors);

    const userMeta = getUserMeta(loggedInEmail);
    const user = await AuthRoleService.updateAuthRole(
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

    if (errors) {
      return sendValidationErrors(errors);
    }

    await AuthRoleService.deleteAuthRole(data.params.id);
    return sendSuccessResponse({ statusCode: 204 });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
