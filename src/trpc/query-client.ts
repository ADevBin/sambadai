
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,        // ← 60s instead of 30s
        gcTime: 5 * 60 * 1000,       // ← keep cache 5 mins
        refetchOnWindowFocus: false, // ← stop refetch on tab switch
        retry: 1,                    // ← only retry once on failure
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}