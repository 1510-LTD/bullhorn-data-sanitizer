import { NextRequest } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "@/app/api/_components/libraries/responseHandler";
import { validateRequest } from "@/app/api/_components/libraries/validator";
import BullhornService from "@/app/api/_components/modules/bullhorn/BullhornService";
import { BhQuerySchema } from "@/app/app-types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: BhQuerySchema,
        data: body
      }
    });

    if (errors) return sendValidationErrors(errors);

    const contacts = await BullhornService.getContacts(data.body);
    return sendSuccessResponse({ data: contacts });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
