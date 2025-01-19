import { logger } from "../logger";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { UnauthenticatedError } from "../errors";

export const AUTH_USER_EMAIL_HTTP_HEADER_KEY = "X-AUTH-USER-EMAIL";

export const getLoggedInUserEmail = async (
  req: NextRequest
): Promise<string> => {
  const fallbackUserEmail = process.env.loggedInUser;
  const res = NextResponse.next();

  const session = await getSession(req, res);

  const userEmail = session?.user.email;

  if (userEmail) {
    return userEmail;
  }

  if (process.env.NODE_ENV === "production") {
    logger.warn(
      `Trying to use the fallback user email in production. This is not allowed.`
    );
    throw new UnauthenticatedError("Unauthorized request");
  }

  if (!fallbackUserEmail)
    throw new UnauthenticatedError("Unauthorized request");

  logger.warn(
    `Could not find ${AUTH_USER_EMAIL_HTTP_HEADER_KEY} in http headers. Returning "${fallbackUserEmail}"`
  );

  return fallbackUserEmail;
};
