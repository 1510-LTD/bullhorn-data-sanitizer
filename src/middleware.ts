import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    // "/((?!api/external/bh/send-email|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

// default middleware without auth for testing purposes
export function middleware(request: NextRequest) {
  // Allow all requests to pass through
  return NextResponse.next();
}

// const customMiddleware = withMiddlewareAuthRequired((req) => {
// this will handle bullhorn default post request
// if (
//   req.method === "POST" &&
//   req.nextUrl.pathname.startsWith("/send-emails")
// ) {
//   return NextResponse.redirect(new URL(req.url), {
//     status: 303
//   });
// }
// Allow other requests to proceed as usual
//   return NextResponse.next();
// });

// export default customMiddleware;
