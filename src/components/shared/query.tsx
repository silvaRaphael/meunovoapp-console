import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError(error: any) {
        console.log(error);
        return false;
      },
    },
  },
});
