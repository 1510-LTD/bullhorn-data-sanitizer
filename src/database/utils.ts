// NOTE: currently there is no library support for pgEnum to zod types
export function pgEnumToStrObject<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const stripPasswordFromDatabaseUrl = (
  databaseUrl: string | undefined
) => {
  if (!databaseUrl) return "";
  const placeholder = "*****";
  const url = new URL(databaseUrl);
  url.password = placeholder;
  return url.toString().replace(placeholder, "<redacted>");
};
