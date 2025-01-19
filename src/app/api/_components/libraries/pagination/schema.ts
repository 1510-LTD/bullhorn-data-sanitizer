import { PaginationOrder } from "@/app/app-types";
import { util, Writeable, z } from "zod";
export const paginationOrderSchema = z.enum(["asc", "desc"]);

export const paginationLinksSchema = z.object({
  nextPage: z.string().nullable(),
  previousPage: z.string().nullable(),
  firstPage: z.string().nullable(),
  lastPage: z.string().nullable()
});

export const paginationMetaSchema = z.object({
  links: paginationLinksSchema,
  searchParams: z.record(z.string(), z.unknown()).and(
    z.object({
      sortBy: z.string().optional(),
      sortOrder: z.string().default("asc"),
      limit: z.number().int().positive().default(10),
      page: z.number().int().positive().optional()
    })
  ),
  counts: z.object({
    items: z.number().int().positive().nullable(),
    pages: z.number().int().positive().nullable()
  })
});

export const paginationResponseSchema = z.object({
  data: z.array(z.record(z.unknown())),
  pagination: paginationMetaSchema
});

/**
 * Schema for page-based pagination queries.
 */
export const getPaginationSchema = <T extends [string, ...string[]]>(
  fields: T,
  defaultField = fields[0] as util.noUndefined<Writeable<T>[number]>
) => {
  return z
    .object({
      sortBy: z.enum(fields).optional().default(defaultField),
      sortOrder: paginationOrderSchema.optional().default("asc"),
      limit: z.coerce
        .number()
        .int()
        .positive()
        .min(1)
        .max(500)
        .optional()
        .default(10),
      page: z.coerce.number().int().positive().optional().default(1)
    })
    .transform(({ sortOrder, page, sortBy: sortByField, limit }) => {
      const sortBy = sortByField || ("createdAt" as T[number]);
      return {
        sortOrder: sortOrder || "asc",
        page,
        sortBy,
        limit
      } as {
        sortOrder: PaginationOrder;
        page: number;
        sortBy: T[number];
        limit: number;
      };
    });
};
