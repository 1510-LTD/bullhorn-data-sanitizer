import type { ZodError } from "zod";

import { JsonData } from "./common";
import { PaginationMeta } from "./pagination";
import { NextApiRequest } from "next";

export namespace Api {
  export interface GeneralError {
    message: string;
    name: string;
  }
  export type ValidationErrorData = {
    type: "Query" | "Params" | "Body";
    errors: ZodError<unknown>;
  };
  export type ValidationError = {
    in: "Query" | "Params" | "Body";
    fields: Record<string, string>;
  };
  export type ResponseError = GeneralError | ValidationError;

  export interface BaseResponse<T> {
    status: "success" | "failed";
    statusCode: number;
    message?: string;
    data?: T;
    traceId?: string;
  }

  export type Response<T> = ErrorResponse<T> | SuccessResponse<T>;

  export interface ErrorResponse<T = undefined> extends BaseResponse<T> {
    status: "failed";
    errors?: ResponseError[];
  }

  export interface SuccessResponse<T> extends BaseResponse<T> {
    status: "success";
  }
}

export type PaginatedResponse<T> = Api.SuccessResponse<T> & {
  pagination?: PaginationMeta;
};

export type TypedRequest = NextApiRequest;

export type SendErrorResponseParams<T extends JsonData, E> = {
  data?: T;
  error: E | E[] | unknown;
  message?: string;
};
