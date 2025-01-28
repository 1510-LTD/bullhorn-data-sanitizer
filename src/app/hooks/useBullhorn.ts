import { useQuery } from "@tanstack/react-query";

import { Api, BhDuplicates, BhHotlist, BhRecipient } from "../app-types";

import { api } from "@/utils/ApiAxiosClient";
import { BhQueryParams } from "../app-types";

export enum BullhornQueryKey {
  BhHotlist = "BhHotlist",
  BhMerge = "BhMerge"
}

export const getBhEntityFields = async (entity: string) => {
  const response = await api.get(`/api/external/bh/fields/${entity}`);
  return response?.data?.fields ?? [];
};

export const getBhEntityDuplicates = async (
  entity: string,
  fields: string[],
  start: number,
  count: number,
  returnInSeconds?: number
): Promise<{
  duplicatesRecords: BhDuplicates;
  start: number;
}> => {
  const response = await api.post(`/api/external/bh/duplicates/${entity}`, {
    fields,
    start,
    count,
    returnInSeconds
  });
  return response?.data ?? [];
};

export const getBhInvalidEntities = async (
  entity: string,
  fields: string[],
  start: number,
  count: number
): Promise<{
  data: { [key: string]: unknown }[];
  start: number;
  count: number;
  total: number;
}> => {
  const response = await api.post(`/api/external/bh/invalid/${entity}`, {
    fields,
    start,
    count
  });

  return response?.data ?? { data: [], count: 0, total: 0 };
};

export const mergeBhEntity = async ({
  entity,
  masterId,
  duplicateId
}: {
  entity: string;
  masterId: string | number;
  duplicateId: string | number;
}) => {
  const master = await api.post(`/api/external/bh/merge/${entity}`, {
    masterId,
    duplicateId
  });
  return master.data;
};

export const fetchBhPeople = async (
  queries?: BhQueryParams
): Promise<BhRecipient[]> => {
  const response = await api.post(`/api/external/bh/people`, {
    ...queries
  });

  return response?.data?.data ?? [];
};

const fetchBhHotlist = async (): Promise<Api.SuccessResponse<BhHotlist[]>> => {
  const response = await api.get(`/api/external/bh/hotlists`);
  return response.data;
};

export const useBhHotlist = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [BullhornQueryKey.BhHotlist],
    queryFn: () => fetchBhHotlist()
  });

  return {
    hotlists: data?.data ?? [],
    isLoading,
    isError,
    error
  };
};
