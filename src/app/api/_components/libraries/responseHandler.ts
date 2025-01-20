import { Api, JsonData, SendErrorResponseParams } from "@/app/app-types";
import {
  HttpError,
  InternalServerError,
  getStatusCode,
  tryParseCommonDbError
} from "./errors";
import { logger } from "./logger";
import { NextResponse } from "next/server";

export const getErrorResponseBody = <E extends HttpError, T extends JsonData>({
  errors,
  message
}: {
  errors: E[];
  message?: string;
}): Api.ErrorResponse<T> => {
  const statusCode = getStatusCode(errors?.[0] || new InternalServerError());
  return {
    status: "failed",
    statusCode,
    message: message ?? "Unable to process request!",
    errors: errors.map((error) => ({
      name: error.name,
      message: error.message
    }))
  };
};

export const sendErrorResponse = <E extends HttpError, T extends JsonData>({
  error,
  message
}: SendErrorResponseParams<T, E>) => {
  const errors = (
    Array.isArray(error)
      ? error
      : error
        ? [tryParseCommonDbError(error as Error)]
        : []
  ) as E[];
  const responseBody = getErrorResponseBody<E, T>({ errors, message });
  logger.error(error);
  return NextResponse.json(
    {
      data: responseBody
    },
    {
      status: responseBody.statusCode
    }
  );
};

export interface SendSuccessResponseParams<
  T extends JsonData,
  S extends number | undefined
> {
  statusCode?: S;
  data?: S extends 204 ? never : T;
  message?: S extends 204 ? never : string;
}

export const getSuccessResponseBody = <
  T extends JsonData,
  S extends number | undefined
>({
  data,
  message,
  statusCode = 200
}: {
  data?: S extends 204 ? never : T;
  message?: S extends 204 ? never : string;
  statusCode?: S;
}): Api.SuccessResponse<T> => {
  return {
    status: "success",
    statusCode,
    message: message ?? "Success!",
    data
  };
};

export function sendSuccessResponse<
  T extends JsonData,
  S extends number | undefined
>({ data, message, statusCode = 200 as S }: SendSuccessResponseParams<T, S>) {
  if (statusCode === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const responseBody = getSuccessResponseBody<T, S>({
    data,
    message,
    statusCode
  });

  return new NextResponse(JSON.stringify(responseBody), { status: statusCode });
}

export const getValidationErrorResponseBody = (
  errors: Array<Api.ValidationErrorData>
): Api.ErrorResponse => ({
  status: "failed",
  statusCode: 400,
  message: `Invalid request data on ${errors
    .map((err) => err.type)
    .join(",")}!`,
  errors: errors.map((error) => {
    return { in: error.type, fields: error.errors.flatten().fieldErrors };
  })
});

export const sendValidationErrors: (
  errors: Array<Api.ValidationErrorData>
) => void = (errors) => {
  const responseBody = getValidationErrorResponseBody(errors);
  return NextResponse.json(
    {
      data: responseBody
    },
    {
      status: 400
    }
  );
};
