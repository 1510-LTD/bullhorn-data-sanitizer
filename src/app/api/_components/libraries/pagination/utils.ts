import { PaginationOptions } from "@/app/app-types";
import { PaginationHandler } from "./handler";
import { SQL, asc, desc, getTableName } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";
import { camelCase } from "string-ts";

export function getPaginationController(options: PaginationOptions) {
  return new PaginationHandler(options);
}

/**
 * Get the pagination cursors for the given sortBy and cursor object.
 * Adds the id cursor as a fallback and tie breaker.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPaginationCursors = <
  S extends string,
  C extends Record<string, any>
>({
  sortBy,
  cursor = {} as C
}: {
  sortBy: S;
  cursor: C;
}): {
  columnName: S | "id";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursor?: any;
}[] => {
  if (!sortBy || sortBy === "id") {
    return [{ columnName: "id", cursor: cursor.id }];
  }

  return [
    { columnName: sortBy, cursor: cursor[sortBy] },
    { columnName: "id", cursor: cursor.id }
  ];
};

export const base64UrlEncode = (obj: Record<string, unknown>): string => {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColumn = <TMainTable extends PgTableWithColumns<any>>(
  columnName: string,
  mainTable: TMainTable,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableMap: Record<string, PgTableWithColumns<any>> = {}
): SQL<unknown> => {
  const parts = columnName.split(".");
  if (parts.length === 1) {
    return mainTable[columnName];
  }
  const [tableName, column] = parts;
  const joinTable = tableMap[tableName] ?? mainTable;
  return joinTable[column];
};

const getCamelizedTableName = <T extends TableConfig>(
  table: PgTableWithColumns<T>
): string => {
  const rawTableName = getTableName(table);
  return camelCase(rawTableName);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOrderByFromCursors = <
  TMainTable extends PgTableWithColumns<any>
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cursors: { columnName: string; cursor?: any }[],
  table: TMainTable,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  joinTables: PgTableWithColumns<any>[] = [],
  sortOrder: "asc" | "desc" = "asc"
): SQL<unknown>[] => {
  const tableMap = joinTables.reduce(
    (acc, joinTable) => ({
      ...acc,
      [getCamelizedTableName(joinTable)]: joinTable
    }),
    {
      [getCamelizedTableName(table)]: table
    }
  );
  return cursors?.map(({ columnName }) =>
    sortOrder === "asc"
      ? asc(getColumn(columnName, table, tableMap))
      : desc(getColumn(columnName, table, tableMap))
  );
};
