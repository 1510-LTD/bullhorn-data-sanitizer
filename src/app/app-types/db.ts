import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { SnakeToCamelCase } from "./common";

/**
 * Extracts the select schema from a table
 */
export type ExtractSelectSchema<T> =
  T extends PgTableWithColumns<any> ? T["$inferSelect"] : never;

/**
 * Creates a union of field names prefixed by their respective table names, specific to each table in the array
 */
export type PrefixedTableFieldNames<T> =
  T extends PgTableWithColumns<any>
    ? `${SnakeToCamelCase<T["_"]["name"]>}.${Extract<
        keyof ExtractSelectSchema<T>,
        string
      >}`
    : never;

/**
 * Generates a union of all prefixed field names across an array of tables
 */
export type GeneratePrefixedFieldNames<
  T extends Array<PgTableWithColumns<any>>
> = {
  [P in keyof T]: PrefixedTableFieldNames<
    Extract<T[P], PgTableWithColumns<any>>
  >;
}[number];
