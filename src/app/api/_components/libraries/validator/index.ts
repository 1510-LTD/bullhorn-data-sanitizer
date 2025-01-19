import { ZodSchema, ZodTypeDef, z } from "zod";
import { Api } from "@/app/app-types";

export declare type ValidationSchemas<
  TParams extends ZodSchema<any, ZodTypeDef, any>,
  TQuery extends ZodSchema<any, ZodTypeDef, any>,
  TBody extends ZodSchema<any, ZodTypeDef, any>
> = {
  params?: {
    schema: TParams;
    data: z.infer<TParams>;
  };
  query?: {
    schema: TQuery;
    data: z.infer<TQuery>;
  };
  body?: {
    schema: TBody;
    data: z.infer<TBody>;
  };
};

export function validateRequest<
  TParams extends ZodSchema<any, ZodTypeDef, any> = never,
  TQuery extends ZodSchema<any, ZodTypeDef, any> = never,
  TBody extends ZodSchema<any, ZodTypeDef, any> = never
>(schemas: ValidationSchemas<TParams, TQuery, TBody>) {
  const parsedRequest: {
    params: TParams extends never ? undefined : z.infer<TParams>;
    query: TQuery extends never ? undefined : z.infer<TQuery>;
    body: TBody extends never ? undefined : z.infer<TBody>;
  } = {
    params: undefined,
    query: undefined,
    body: undefined
  } as typeof parsedRequest;

  const errors: Array<Api.ValidationErrorData> = [];
  if (schemas.params) {
    const parsed = schemas.params.schema.safeParse(schemas.params.data);
    if (parsed.success) {
      parsedRequest.params = parsed.data;
    } else {
      errors.push({ type: "Params", errors: parsed.error });
    }
  }
  if (schemas.query) {
    const parsed = schemas.query.schema.safeParse(schemas.query.data);
    if (parsed.success) {
      parsedRequest.query = parsed.data;
    } else {
      errors.push({ type: "Query", errors: parsed.error });
    }
  }
  if (schemas.body) {
    const parsed = schemas.body.schema.safeParse(schemas.body.data);
    if (parsed.success) {
      parsedRequest.body = parsed.data;
    } else {
      errors.push({ type: "Body", errors: parsed.error });
    }
  }
  if (errors.length > 0) {
    return {
      errors: errors
    };
  } else {
    return {
      data: parsedRequest
    };
  }
}
