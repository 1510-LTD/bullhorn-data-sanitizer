import { useQuery } from "@tanstack/react-query";

import {
  Api,
  BhContact,
  BhDuplicates,
  BhHotlist,
  BhJob,
  BhRecipient
} from "../app-types";

import { api } from "@/utils/ApiAxiosClient";
import { BhCandidate, BhQueryParams } from "../app-types";

export enum BullhornQueryKey {
  BhCandidates = "BhCandidates",
  BhCandidate = "BhCandidate",
  BhContacts = "BhContacts",
  BhHotlist = "BhHotlist",
  BhDistributionList = "BhDistributionList",
  BhMerge = "BhMerge"
}

type Queries = BhQueryParams;

export const fetchBhCandidates = async (
  queries?: BhQueryParams
): Promise<BhCandidate[]> => {
  const response = await api.post(`/api/external/bh/candidates`, {
    ...queries
  });

  return response?.data ?? [];
};

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

export const useBhCandidates = (queries?: Queries) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [BullhornQueryKey.BhCandidates, JSON.stringify(queries)],
    queryFn: () => fetchBhCandidates(queries)
  });

  return {
    candidates: data,
    isLoading,
    isError,
    error
  };
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

export const fetchBhRecipients = async (
  queries?: BhQueryParams
): Promise<BhRecipient[]> => {
  const response = await api.post(`/api/external/bh/recipients`, {
    ...queries
  });

  return response?.data ?? [];
};

export const fetchBhPeople = async (
  queries?: BhQueryParams
): Promise<BhRecipient[]> => {
  const response = await api.post(`/api/external/bh/people`, {
    ...queries
  });

  return response?.data?.data ?? [];
};

export const fetchBhContacts = async (
  queries?: BhQueryParams
): Promise<BhContact[]> => {
  const response = await api.post(`/api/external/bh/contacts`, {
    ...queries
  });

  return response?.data ?? [];
};

export const useBhContacts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [BullhornQueryKey.BhContacts],
    queryFn: () => fetchBhContacts()
  });

  return {
    contacts: data,
    isLoading,
    isError,
    error
  };
};

export const fetchBhJobs = async (
  queries?: BhQueryParams
): Promise<BhJob[]> => {
  const response = await api.post(`/api/external/bh/jobs`, {
    ...queries
  });

  return response?.data ?? [];
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

const fetchBhHotlistCandidates = async (
  hotlistId: string
): Promise<Api.SuccessResponse<BhCandidate[]>> => {
  const response = await api.get(
    `/api/external/bh/hotlists/${hotlistId}/candidates`
  );
  return response.data;
};

export const useBhHotlistCandidates = (hotlistId: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [BullhornQueryKey.BhHotlist, hotlistId],
    queryFn: () => fetchBhHotlistCandidates(hotlistId)
  });

  return {
    hotlistCandidates: data?.data ?? [],
    isLoading,
    isError,
    error
  };
};

export const fetchBhHotlistContacts = async (
  hotlistId: string
): Promise<BhContact[]> => {
  const response = await api.get(
    `/api/external/bh/hotlists/${hotlistId}/contacts`
  );
  return response.data;
};

const fetchBhDistributionList = async (): Promise<
  Api.SuccessResponse<unknown[]>
> => {
  const response = await api.get(`/api/external/bh/distribution-lists`);
  return response.data;
};

export const useBhDistributionList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [BullhornQueryKey.BhDistributionList],
    queryFn: () => fetchBhDistributionList()
  });

  return {
    distributionList: data?.data ?? [],
    isLoading,
    isError,
    error
  };
};
