import { NextRequest } from "next/server";
import {
  sendErrorResponse,
  sendSuccessResponse
} from "@/app/api/_components/libraries/responseHandler";
import BullhornService from "@/app/api/_components/modules/bullhorn/BullhornService";

export async function GET(
  _request: NextRequest,
  { params: { entity } }: { params: { entity: string } }
) {
  try {
    const fields = await BullhornService.getFields(entity);
    return sendSuccessResponse({ data: fields });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
