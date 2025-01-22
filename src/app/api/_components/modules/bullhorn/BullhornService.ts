/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BhDuplicates, BhRecipient, JsonData } from "@/app/app-types";
import { getBullhornAxiosClient } from "@/app/api/_lib/BhAxiosClient";
import { AxiosError } from "axios";

import {
  BhCandidate,
  BhContact,
  BhHotlist,
  BhQueryParams
} from "@/app/app-types";
import { logger } from "../../libraries/logger";

const candidateFields = {
  id: "id",
  name: "name",
  firstName: "firstName",
  lastName: "lastName",
  owner: "owner(id,firstName,lastName)",
  occupation: "occupation",
  companyName: "companyName",
  mobile: "mobile",
  email: "email",
  customText10: "customText10"
};

const getRecipients = async ({
  query
}: BhQueryParams): Promise<BhRecipient[]> => {
  try {
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(`/lookup/expanded`, {
      params: {
        entity: ["ClientContact", "Candidate", "CorporateUser", "Lead"].join(
          ","
        ),
        fields: Object.values(candidateFields).join(","),
        count: 10,
        isCountPerEntity: true,
        filter: query
      }
    });
    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const getPeoples = async ({ ids }: BhQueryParams): Promise<BhRecipient[]> => {
  try {
    const { owner, ...peopleCommonFields } = candidateFields;
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(`/query/Person`, {
      params: {
        fields: Object.values(peopleCommonFields).join(","),
        where: `id IN (${ids!.join(",")})`
      }
    });
    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const getCandidates = async (
  queries: BhQueryParams
): Promise<BhCandidate[]> => {
  try {
    const { ids, query, fields, page, limit } = queries;

    const axiosClient = await getBullhornAxiosClient();
    if (ids?.length) {
      const { data } = await axiosClient.get(
        `/entity/Candidate/${ids.join(",")}`,
        {
          params: {
            fields: Object.values(fields || candidateFields).join(",")
          }
        }
      );
      return data?.data as BhCandidate[];
    } else {
      const { data } = await axiosClient.get(`/search/Candidate`, {
        params: {
          // if query is consist of multiple words, split them and join with "AND" to search for exact match
          query: `${
            query?.length
              ? `name:${query
                  .split(" ")
                  .map((word) => `${word}*`)
                  .join("")}* AND`
              : ""
          } isDeleted:0 AND NOT status:Archive`,
          fields: Object.values(fields || candidateFields).join(","),
          start: page,
          count: limit
        }
      });
      return data?.data as BhCandidate[];
    }
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const contactFields = {
  id: "id",
  name: "name",
  firstName: "firstName",
  lastName: "lastName",
  owner: "owner(id,firstName,lastName)",
  companyName: "companyName",
  mobile: "mobile",
  email: "email"
};

const getContacts = async (queries: BhQueryParams): Promise<BhContact[]> => {
  try {
    const { ids, query, fields, page, limit } = queries;
    const axiosClient = await getBullhornAxiosClient();
    if (ids?.length) {
      const { data } = await axiosClient.get(
        `/entity/ClientContact/${ids.join(",")}`,
        {
          params: {
            fields: Object.values(contactFields).join(",")
          }
        }
      );
      return data?.data as BhContact[];
    } else {
      const { data } = await axiosClient.get(`/search/ClientContact`, {
        params: {
          // if query is consist of multiple words, split them and join with "AND" to search for exact match
          query: `${
            query?.length
              ? `name:${query
                  .split(" ")
                  .map((word) => `${word}*`)
                  .join("")}* AND`
              : ""
          } isDeleted:0 AND NOT status:Archive`,
          fields: Object.values(fields || contactFields).join(","),
          start: page,
          count: limit
        }
      });
      return data?.data as BhContact[];
    }
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const getDistributionList = async (): Promise<JsonData> => {
  try {
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(
      `/query/DistributionList?fields=id%2Cname%2Cowner(id%2ClastName%2CfirstName%2Cenabled)%2CisReadOnly&start=500&count=500&orderBy=name&where=id%3E0`
    );
    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const getHotlists = async (): Promise<BhHotlist[]> => {
  try {
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(
      `/query/Tearsheet?showTotalMatched=true&count=500&fields=id%2Cname%2Ccandidates%5B0%5D%2CclientContacts%5B0%5D%2CjobOrders%5B0%5D%2Copportunities%5B0%5D%2Cleads%5B0%5D%2Cusers%5B0%5D%2CisPrivate%2Cowner(id%2CfirstName%2ClastName)%2CdateAdded%2CisUserTearsheet&start=0&where=isDeleted%3Dfalse%20AND%20isUserTearsheet%3Dfalse&orderBy=-dateAdded&uniqueCallId=e6031224-6a8d-477c-b764-d1b4cb25db03&highLevelCallStack=/content/tools/tearsheets`
    );
    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

// https://rest20.bullhornstaffing.com/rest-services/ao0r21/lookup/expanded?entity=Candidate&filter=atikur&start=0&count=20&uniqueCallId=8e612106-dd96-4773-99a9-f4cb9651ea10&highLevelCallStack=/content/actions/compose-message
const lookupExpanded = async (
  entity: string,
  fields: string[],
  filter: string | undefined,
  start: number,
  count: number
): Promise<BhRecipient[]> => {
  try {
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(`/lookup/expanded`, {
      params: {
        entity,
        filter,
        fields: fields.join(","),
        start,
        count
      }
    });

    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const getFields = async (entity: string): Promise<Record<string, unknown>> => {
  try {
    const axiosClient = await getBullhornAxiosClient();
    const { data } = await axiosClient.get(`/meta/${entity}`, {
      params: { fields: "*" }
    });

    return data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

// https://rest20.bullhornstaffing.com/rest-services/AO0R21/search/Candidate?fields=id%2Cname%2CmassMailOptOut%2CcustomText10%2CcustomDate10&sort=-customDate10&start=0&count=25&query=isDeleted%3A0%20%20AND%20NOT%20status%3AArchive&showTotalMatched=true&showLabels=true&entityId=-1&BhRestToken=25397_7952520_fed09f06-db6b-4212-86bd-24dee4870759&uniqueCallId=a37931e6-67ca-4835-9094-e7527aa831a1&highLevelCallStack=mosaic%2Fconfig

const getNEntities = async (
  entity: string,
  fields: string[],
  start = 0,
  count = 10
) => {
  switch (entity) {
    case "Candidate": {
      const people = await getCandidates({
        query: undefined,
        ids: undefined,
        fields,
        page: start,
        limit: count
      });
      return people;
    }

    case "ClientContact": {
      const people = await getContacts({
        query: undefined,
        ids: undefined,
        fields,
        page: start,

        limit: count
      });
      return people;
    }
    default: {
      const people = await lookupExpanded(
        entity,
        fields,
        undefined,
        start,
        count
      );
      return people;
    }
  }
};

const getDuplicatesEntities = async (
  entity: string,
  fields: string[],
  start = 0,
  count = 10,
  returnInSeconds?: number
): Promise<{ duplicatesRecords: BhDuplicates; start: number }> => {
  const duplicatesRecords: BhDuplicates = {};

  const ENTITY_COUNT = 50;

  let shouldBreak = false;

  // set a timer and if it is reached, break the loop
  if (returnInSeconds) {
    setTimeout(() => {
      shouldBreak = true;
    }, returnInSeconds * 1000);
  }

  while (!shouldBreak) {
    const people = await getNEntities(entity, fields, start, ENTITY_COUNT);

    if (!people.length) break;

    for (const person of people) {
      if (shouldBreak) break;
      start += 1;

      // check if this person has values in fields
      if (!fields.every((field) => person[field as keyof typeof person]))
        continue;

      try {
        // for each entity, check for duplicate entities using get duplicates api
        const duplicates = await getDuplicates(entity, fields, person);

        // if duplicate entities are found, add them to the list
        if (duplicates?.length > 1) {
          duplicatesRecords[Number(person.id)] = duplicates;
        }
      } catch (error) {
        logger.error(error);
      }

      if (Object.keys(duplicatesRecords).length >= count) {
        shouldBreak = true;
        break;
      }
    }
  }

  return {
    duplicatesRecords,
    start
  };
};

const generateQuery = (fields: string[], values: Record<string, unknown>) => {
  const getValue = (field: string) => {
    if (typeof values[field] === "string") {
      return `(${values[field]})`;
    }
    if (values[field] === undefined) {
      return "null";
    }
    if (Array.isArray(values[field])) {
      return values[field].join(",");
    }
    return JSON.stringify(values[field]);
  };

  // Prioritize certain fields for more accurate matching
  const emailField = fields.find((f) => f === "email");
  const nameFields = fields.filter((f) =>
    ["firstName", "lastName", "name"].includes(f)
  );
  const otherFields = fields.filter(
    (f) => !["email", "firstName", "lastName", "name"].includes(f)
  );

  const queryParts = [];

  // Email is most specific, so check it first
  if (emailField && values[emailField]) {
    queryParts.push(`email:(${values[emailField]})`);
  }

  // Name fields should be combined with AND
  if (nameFields.length > 0) {
    const nameQuery = nameFields
      .filter((field) => values[field])
      .map((field) => `${field}:${getValue(field)}`)
      .join(" AND ");
    if (nameQuery) {
      queryParts.push(`(${nameQuery})`);
    }
  }

  // Other fields can be OR'd if needed
  const otherQuery = otherFields
    .filter((field) => values[field])
    .map((field) => `${field}:${getValue(field)}`)
    .join(" AND ");
  if (otherQuery) {
    queryParts.push(`(${otherQuery})`);
  }

  return queryParts.length > 0
    ? `(${queryParts.join(" AND ")}) AND isDeleted:0`
    : "isDeleted:0";
};

// https://rest20.bullhornstaffing.com/rest-services/ao0r21/search/Candidate?meta=full&fields=id%2Cname%2Cemail%2Cowner%2Cstatus&query=((lastName%3A(Rahman*)%20AND%20firstName%3A(At*))%20OR%20email%3A(atikur2667%2B12%40gmail.com))%20AND%20isDeleted%3A0&uniqueCallId=bd7db0ae-88da-429f-ad18-b65b2bf8d205&highLevelCallStack=/content/fast-add/Candidate
const getDuplicates = async (
  entity: string,
  fields: string[],
  values: Record<string, unknown>
): Promise<BhCandidate[]> => {
  try {
    const sanitizedFields = fields.filter((field) => field !== "id");
    const axiosClient = await getBullhornAxiosClient();

    const query = generateQuery(sanitizedFields, values);

    const { data } = await axiosClient.get(`/search/${entity}`, {
      params: {
        fields: "*",
        query
      }
    });

    return data.data;
  } catch (error) {
    throw (error as AxiosError)?.response?.data ?? error;
  }
};

const BullhornService = {
  getRecipients,
  getPeoples,
  getFields,
  getCandidates,
  getContacts,
  getHotlists,
  getDistributionList,
  lookupExpanded,
  getDuplicatesEntities
};
export default BullhornService;
