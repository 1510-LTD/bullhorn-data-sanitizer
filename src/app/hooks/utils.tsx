import {
  DefaultError,
  QueryKey,
  queryOptions,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

export const useInvalidateQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>() => {
  const queryClient = useQueryClient();
  const invalidateQuery = ((
    options: Parameters<
      typeof queryOptions<TQueryFnData, TError, TData, TQueryKey>
    >[0]
  ) => {
    queryClient.invalidateQueries(options);
  }) as typeof useQuery;

  return invalidateQuery;
};

export const useInvalidateQueryByKeys = () => {
  const invalidateQuery = useInvalidateQuery();

  return (key: (string | undefined)[]) => {
    invalidateQuery({ queryKey: [...key] });
  };
};
