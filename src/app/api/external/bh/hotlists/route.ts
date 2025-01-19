import {
  sendErrorResponse,
  sendSuccessResponse
} from "@/app/api/_components/libraries/responseHandler";
import BullhornService from "@/app/api/_components/modules/bullhorn/BullhornService";

export async function GET() {
  try {
    const hotLists = await BullhornService.getHotlists();

    return sendSuccessResponse({ data: hotLists });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
