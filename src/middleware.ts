import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export const config = {
  matcher: [
    // "/((?!api/external/bh/send-email|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

// default middleware without auth for testing purposes
// export function middleware(request: NextRequest) {
//   // Allow all requests to pass through
//   return NextResponse.next();
// }

const customMiddleware = withMiddlewareAuthRequired();

export default customMiddleware;
