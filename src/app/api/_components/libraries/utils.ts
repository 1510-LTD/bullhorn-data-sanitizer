import { z } from "zod";
import { v5 as uuidV5 } from "uuid";
import { ValidationError } from "./errors";
import { UserMeta } from "@/app/app-types";

export const commaSeparatedStringToArray = (str: string | undefined) => {
  if (!str) return [];
  return str.split(",").map((s) => s.trim());
};

/**
 * Zod schema for custom fields, which are stored as JSONB in the database. This schema is used to validate the input from the client.
 */
export const customFieldsSchema = z.any().transform((value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new ValidationError("Invalid value for 'customFields'");
    }
  }
  return undefined;
});

const PRIVATE_NAMESPACE = "f7b1b4e1-5b1b-4b0b-8d7e-2b4b3d3d3d3d";

/**
 * Generates a PRIVATE_NAMESPACE_SCOPED UUID v5 based on the given identifier.
 *
 * @param identifier - The identifier to use to generate the UUID.
 * @returns The generated UUID.
 */
export const generateUuidV5 = (identifier: string) =>
  uuidV5(identifier, PRIVATE_NAMESPACE);

export const getUserMeta = (email: string | undefined | null): UserMeta => {
  if (!email)
    throw new ValidationError("User email not found in request headers");
  const userMeta = {
    id: generateUuidV5(email),
    email: email
  };

  return userMeta;
};
