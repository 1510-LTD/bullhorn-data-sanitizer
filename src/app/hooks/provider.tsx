"use client";
import { ReactNode, useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache
} from "@tanstack/react-query";
import toast from "react-hot-toast";

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000 * 2
          }
        },
        queryCache: new QueryCache({
          // this will trigger when background fetch fails.
          onError: (error, query) => {
            if (query.state.data !== undefined) {
              toast.error(`Something went wrong. Please reload the page.`, {});
            }
          }
        })
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
