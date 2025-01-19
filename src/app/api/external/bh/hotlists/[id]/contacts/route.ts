import {
  sendErrorResponse,
  sendSuccessResponse
} from "@/app/api/_components/libraries/responseHandler";
import BullhornService from "@/app/api/_components/modules/bullhorn/BullhornService";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // const { data, errors } = validateRequest({
    //   params: {
    //     schema: ParamsSchema.Id,
    //     data: context.params
    //   }
    // });

    // if (errors) {
    //   return sendValidationErrors(errors);
    // }

    const hotlist = await BullhornService.getHotListContacts(
      Number(context.params.id)
    );
    return sendSuccessResponse({ data: hotlist });
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
