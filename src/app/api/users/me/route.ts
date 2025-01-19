import { NextRequest } from "next/server";
import { getLoggedInUserEmail } from "../../_components/libraries/authentication";
import {
  sendErrorResponse,
  sendSuccessResponse
} from "../../_components/libraries/responseHandler";
import UserService from "../../_components/modules/user/UserService";
import { AuthorizationError } from "../../_components/libraries/errors";

export async function GET(request: NextRequest) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);
    const user = await UserService.getUserByEmail(loggedInEmail);

    if (!user) {
      throw new AuthorizationError(`Unauthorized user.`);
    }

    return sendSuccessResponse({
      statusCode: 200,
      data: user
    });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
