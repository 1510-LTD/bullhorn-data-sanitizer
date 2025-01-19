import { SQL, sql } from "drizzle-orm";
import { PgSelect, PgTableWithColumns } from "drizzle-orm/pg-core";
import { getOrderByFromCursors, getPaginationController } from "./utils";
import { PaginatedData } from "@/app/app-types";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * Create a paginated query using page-based pagination.
 * This function will give the paginated query that can be executed to get the paginated data and the total count.
 *
 * @param db - The database connection.
 * @param table - The table to query.
 * @param baseQuery - The base query to use. Typically a select query with the desired fields, joins, etc. but without the where clause, limit or offset.
 * @param where - The where clause to apply to the query.
 *
 * **Below coming from express locals, set by the pagination request middleware:**
 * @param cursors - The cursor values to use for pagination.
 * @param sortOrder - The sort order to use for pagination.
 * @param limit - The number of items to return per page.
 * @param page - The current page number.
 *
 * @returns A function that can be called to execute the paginated query.
 *
 * @example
 * ```ts
 * import { db } from './db'; // the drizzle-orm database connection
 * import { resource } from './resourceTable'; // the drizzle-orm table
 *
 * const getPaginatedData = withPagePagination({
 *   db,
 *   table: resource,
 *   baseQuery: db.select({ asset: { id: resource.id, name: resource.name } }).from(resource).$dynamic(),
 *   where: sql`resource.name = 'test'`,
 *   ...res.locals.pagination, // res.locals.pagination is set by the pagination request middleware
 * });
 * ```
 */
export const withPagination = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CursorTable extends PgTableWithColumns<any>,
  TableColumns extends CursorTable,
  Column extends TableColumns[keyof TableColumns],
  Cursor extends ReturnType<Column["mapFromDriverValue"]> | undefined,
  Order extends "asc" | "desc",
  Select extends PgSelect,
  Data extends Select["_"]["result"]
>(params: {
  db: NodePgDatabase;
  table: CursorTable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  joinTables?: PgTableWithColumns<any>[];
  baseQuery: Select;
  where: SQL<unknown>;
  cursors: {
    columnName: string;
    cursor?: Cursor;
  }[];
  sortOrder: Order;
  limit: number;
  page: number;
  searchParams?: Record<string, unknown>;
}): (() => Promise<PaginatedData<Data>>) => {
  const {
    db,
    baseQuery,
    where,
    cursors,
    sortOrder,
    limit,
    page: currentPage,
    table,
    joinTables,
    searchParams
  } = params;
  const controller = getPaginationController({
    currentPage,
    limit,
    cursors,
    sortOrder,
    searchParams
  });

  const { offset: calculatedOffset, limit: calculatedLimit } =
    controller.getInstructions();
  const itemQuery = db
    .$with("items")
    .as<(typeof baseQuery)["_"]["selectedFields"]>(baseQuery.where(where));
  const orderBy = getOrderByFromCursors(cursors, table, joinTables, sortOrder);
  return async (): Promise<PaginatedData<Data>> => {
    const items = await baseQuery
      .where(where)
      .orderBy(...orderBy)
      .limit(calculatedLimit)
      .offset(calculatedOffset)
      .execute();

    const [itemCount] = await db
      .with(itemQuery)
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(itemQuery)
      .execute();
    return controller.getResponse<Data>({
      data: items as Data,
      totalCount: itemCount.count
    });
  };
};
