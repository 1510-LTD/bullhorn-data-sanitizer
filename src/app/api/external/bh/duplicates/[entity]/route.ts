import { NextRequest } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse,
  sendValidationErrors
} from "@/app/api/_components/libraries/responseHandler";
import BullhornService from "@/app/api/_components/modules/bullhorn/BullhornService";
import { z } from "zod";
import { validateRequest } from "@/app/api/_components/libraries/validator";

export async function POST(
  request: NextRequest,
  { params: { entity } }: { params: { entity: string } }
) {
  try {
    const body = await request.json();

    const { errors, data } = validateRequest({
      body: {
        schema: z.object({
          fields: z.array(z.string()),
          start: z.number(),
          count: z.number()
        }),
        data: body
      }
    });

    if (errors) return sendValidationErrors(errors);

    const { fields, start, count } = data.body;

    const item = await BullhornService.getDuplicatesEntities(
      entity,
      fields?.length > 0 ? fields : ["id", "firstName", "lastName", "email"],
      start,
      count
    );

    console.log(
      "start",
      item.start,
      "total duplicates",
      Object.keys(item.duplicatesRecords).length
    );

    return sendSuccessResponse({
      data: item
    });
  } catch (error) {
    console.log("error", error);
    return sendErrorResponse({ error });
  }
}
