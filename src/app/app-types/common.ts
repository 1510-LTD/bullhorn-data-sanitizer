import { TypeOfDb, TypeOfDbSchema } from "@/database/db";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import { z } from "zod";

export interface UserMeta {
  id: string;
  email: string;
}

export type DbOrTransactionType =
  | PgTransaction<
      NodePgQueryResultHKT,
      TypeOfDbSchema,
      ExtractTablesWithRelations<TypeOfDbSchema>
    >
  | TypeOfDb;

export enum Actions {
  Create = "create",
  Update = "update",
  Delete = "delete",
  Mention = "mention", // used for tagging in comments, notes, etc.
  Merge = "merge"
}

export type Data = Record<string, unknown>;
export type JsonData = Data | Data[] | null;

export type Invalid<T> = Error & { __errorMessage: T };

export type AsUniqueArray<
  A extends ReadonlyArray<unknown>,
  B extends ReadonlyArray<unknown>
> = {
  [I in keyof A]: unknown extends {
    [J in keyof B]: J extends I ? never : B[J] extends A[I] ? unknown : never;
  }[number]
    ? Invalid<[A[I], "is repeated"]>
    : A[I];
};

export type Narrowable =
  | string
  | number
  | boolean
  | object
  | null
  | undefined
  | symbol;

export const asUniqueArray = <
  N extends Narrowable,
  A extends [] | (ReadonlyArray<N> & AsUniqueArray<A, A>)
>(
  a: A
) => a;

/**
 * Converts a snake_case string to camelCase
 */
export type SnakeToCamelCase<S extends string> =
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamelCase<Tail>>}`
    : S;

const BaseConfigSchema = z.object({
  to: z.string().email(),
  from: z.string().email(),
  senderName: z.string().optional(),
  bcc: z.array(z.string().email()).optional(),
  cc: z.array(z.string().email()).optional(),
  subject: z.string(),
  sgTemplateId: z.string().optional(),
  bhEntityId: z.number().optional()
});

// Define the MailConfig schema as a union of two extended schemas
export const MailConfigSchema = z.union([
  BaseConfigSchema.extend({
    text: z.string() // Requires the text property
  }),
  BaseConfigSchema.extend({
    template: z.string() // Requires the template property
  })
]);

export type MailConfig = z.infer<typeof MailConfigSchema>;
