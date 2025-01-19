import { Api } from "@/app/app-types";

export const getConcatedUserName = (obj?: {
  firstName: string;
  lastName?: string | null;
}) => {
  if (!obj) return "";
  const { firstName, lastName } = obj;
  return [firstName, lastName].join(" ");
};

enum ErrorType {
  NoAccess = "NoAccess",
  EmptyData = "EmptyData",
  ApiError = "ApiError"
}

type ExtractedError = {
  message: string;
  fields: string[];
  type: ErrorType;
};

const isApiError = (error: unknown): error is Api.ErrorResponse => {
  return typeof error === "object" && error !== null;
};

const getErrorType = (statusCode: number): ErrorType => {
  switch (statusCode) {
    case 403:
      return ErrorType.NoAccess;
    case 204: // Assuming 204 indicates no content (i.e., EmptyData)
      return ErrorType.EmptyData;
    default:
      return ErrorType.ApiError;
  }
};

export const extractErrors = (error: unknown): ExtractedError => {
  if (!isApiError(error)) {
    return {
      message: "An unknown error occurred",
      type: ErrorType.ApiError,
      fields: []
    };
  }

  const { message, statusCode } = error;
  const type = getErrorType(statusCode);
  if (type == ErrorType.NoAccess) {
    return { message: "You do not have access to this data", type, fields: [] }; // Enforcing a message for NoAccess errors
  }

  if (!error) {
    return { message: message ?? "An error occurred", type, fields: [] };
  }

  const errors = Array.isArray(error) ? error : [];

  const fields = errors.flatMap((err) => {
    if ("message" in err) {
      return [err.message];
    } else if ("fields" in err) {
      return Object.entries(err.fields).map(
        ([key, value]) => `${key}: ${value}`
      );
    } else {
      return [];
    }
  });

  return { message: message ?? "An error occurred", type, fields };
};
