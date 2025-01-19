import { logger } from "../logger";
import { BadRequestError, ValidationError } from "./bad-request";
import { ConflictError } from "./conflict";
import { ForbiddenError } from "./forbidden";
import { HttpError } from "./http";
import { InternalServerError } from "./internal-server";
import { NotFoundError } from "./not-found";
import { UnauthenticatedError } from "./unauthorized";
import { camelCase } from "string-ts";

export const toHttpError = (error: Error): HttpError => {
  if (error instanceof HttpError) {
    return error;
  }
  switch (error.name) {
    case "NotFoundError":
      return new NotFoundError(error.message);
    case "UnauthorizedError":
      return new UnauthenticatedError(error.message);
    case "ForbiddenError":
      return new ForbiddenError(error.message);
    case "BadRequestError":
      return new BadRequestError(error.message);
    case "ConflictError":
      return new ConflictError(error.message);
    default:
      return new InternalServerError(error.message);
  }
};

export const fromStatusCode = (statusCode: number): HttpError => {
  switch (statusCode) {
    case 400:
      return new BadRequestError();
    case 401:
      return new UnauthenticatedError();
    case 403:
      return new ForbiddenError();
    case 404:
      return new NotFoundError();
    case 409:
      return new ConflictError();
    case 500:
      return new InternalServerError();
    default:
      return new HttpError("Unknown Error", statusCode);
  }
};

export const getStatusCode = <E extends HttpError>(error: E | undefined) => {
  return error?.status || 500;
};

export enum PostgreSQLErrorCodes {
  connection_exception = "08000",
  data_exception = "22000",
  integrity_constraint_violation = "23000",
  invalid_cursor_state = "34000",
  invalid_transaction_state = "25000",
  invalid_sql_statement_name = "26000",
  invalid_authorization_specification = "28000",
  insufficient_privilege = "42501",
  syntax_error = "42601",
  undefined_table = "42P01",
  undefined_column = "42703",
  duplicate_column = "42701",
  duplicate_object = "42710",
  foreign_key_violation = "23503",
  unique_violation = "23505",
  check_violation = "23514",
  not_null_violation = "23502",
  exclusion_violation = "23P01"
}

/**
 * Extracts the first key from the detail field of a Postgres error.
 */
const getKeyFromDetail = (detail: string) => {
  const key = detail.match(/Key \((.*)\)=\((.*)\)/);
  return key ? key[1] : undefined;
};

/**
 * Build error message chunk with field name from the error object. If the field name is not present, returns an empty string.
 */
const getFieldText = (error: Error) => {
  const field =
    "column" in error && typeof error.column === "string"
      ? error.column
      : "detail" in error && typeof error.detail === "string"
        ? getKeyFromDetail(error.detail)
        : undefined;

  return field ? `in field ${camelCase(field)} ` : "";
};

export const tryParseCommonDbError = (error: Error) => {
  if ("code" in error) {
    switch (error?.code) {
      case PostgreSQLErrorCodes.foreign_key_violation:
        return new ValidationError(
          `Provided foreign key ${getFieldText(error)}is invalid.`
        );
      case PostgreSQLErrorCodes.not_null_violation:
        return new ValidationError(
          `Provided value ${getFieldText(error)}is invalid.`
        );
      case PostgreSQLErrorCodes.unique_violation:
        return new ConflictError(
          `Provided value ${getFieldText(error)}already exists and violates unique constraint.`
        );
      case PostgreSQLErrorCodes.data_exception:
        return new ValidationError(
          error?.message ?? `Provided value ${getFieldText(error)}is invalid.`
        );
      case PostgreSQLErrorCodes.syntax_error:
      default:
        logger.error(error, `Unhandled database error: ${error}`);
        return new InternalServerError(
          "Something went wrong. Please try again later."
        );
    }
  }
  return error;
};
