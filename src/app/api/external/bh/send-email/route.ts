import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "@/app/api/_components/libraries/responseHandler";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const entity = data.get("EntityType");
    const entityId = data.get("EntityID");
    const bhUserId = data.get("UserID");
    const corporationId = data.get("CorporationID");

    // redirect to send-email route
    const url = new URL(
      request.nextUrl.origin +
        `/send-emails?entity=${entity}&entityId=${entityId}&bhUserId=${bhUserId}&corporationId=${corporationId}`
    );
    return NextResponse.redirect(url);
  } catch (error) {
    return sendErrorResponse({ error });
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = await request.formData();

    const entity = data.get("EntityType");
    const entityId = data.get("EntityID");
    const bhUserId = data.get("UserID");
    const corporationId = data.get("CorporationID");

    // redirect to send-email route
    const url = new URL(
      request.nextUrl.origin +
        `/send-emails?entity=${entity}&entityId=${entityId}&bhUserId=${bhUserId}&corporationId=${corporationId}`
    );
    return NextResponse.redirect(url);
  } catch (error) {
    return sendErrorResponse({ error });
  }
}
