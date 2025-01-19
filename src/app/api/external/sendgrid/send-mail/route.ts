import { NextRequest } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "../../../_components/libraries/responseHandler";
import SendGridService from "../../../_components/modules/sendGrid/SendGridService";
import { validateRequest } from "@/app/api/_components/libraries/validator";
import { authorize } from "@/app/api/_components/libraries/authorization/acl";
import { AuthAccessType } from "@/database/schema";
import { getLoggedInUserEmail } from "@/app/api/_components/libraries/authentication";
import { MailConfigSchema } from "@/app/app-types";

export async function POST(request: NextRequest) {
  try {
    const loggedInEmail = await getLoggedInUserEmail(request);
    await authorize(loggedInEmail, "emails", AuthAccessType.ADMIN);

    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: MailConfigSchema,
        data: body
      }
    });
    if (errors) return sendValidationErrors(errors);

    await SendGridService.sendMail(data.body);
    return sendSuccessResponse({ data: {} });
  } catch (error: any) {
    return sendErrorResponse({ error: error?.response?.body.errors ?? error });
  }
}
