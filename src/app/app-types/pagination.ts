import { z } from "zod";
import {
  paginationMetaSchema,
  paginationOrderSchema
} from "../api/_components/libraries/pagination/schema";

export interface PaginationCursor<T extends string = string, C = unknown> {
  columnName: "id" | T;
  cursor?: C;
}

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export type PaginationOrder = z.infer<typeof paginationOrderSchema>;

export interface PaginatedData<T> {
  data: T;
  pagination: PaginationMeta;
}

export interface PaginationOptions {
  currentPage: number;
  cursors: PaginationCursor[];
  limit: number;
  sortOrder: PaginationOrder;
  searchParams?: Record<string, unknown>;
}

/**
 * The pagination middleware will add a `locals.pagination` object to the request object.
 * This type is used to define the shape of that object.
 */
export interface PaginationLocals<T extends string = any> {
  cursors: PaginationCursor<T>[];
  sortOrder: PaginationOrder;
  limit: number;
  page: number;
  searchParams: Record<string, unknown>;
}
