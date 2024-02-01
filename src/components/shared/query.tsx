import { QueryClient } from "@tanstack/react-query";
import { errorToast } from "./error-toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError(error: any) {
        setTimeout(() => errorToast(error.response.data), 0);
        return false;
      },
    },
  },
});
