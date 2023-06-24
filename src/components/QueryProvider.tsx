import { ReactNode, useCallback, useMemo } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { startCase } from "lodash-es";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const handleQueryError = useCallback(
    ({ request, response }: AxiosError<any>) => {
      let msg: string = response?.data?.message || "حدث خطأ غير متوقع";
      if (request.status === 401) {
        msg = "انتهت جلستك";
      } else if (request.status === 0) msg = "لا يمكن الاتصال بالخادم";
      toast({
        title: "خطأ",
        description: msg,
        status: "error",
        isClosable: true,
      });
    },
    [toast]
  );

  const handleMutationError = useCallback(
    (error: AxiosError<any>) => {
      const errors = error.response?.data?.errors;
      if (typeof errors !== "object") return handleQueryError(error);

      Object.keys(errors).forEach((key: any) => {
        const error = Array.isArray(errors[key])
          ? errors[key].join(", ")
          : errors[key];
        toast({
          title: startCase(key),
          description: error,
          status: "error",
          isClosable: true,
        });
      });
    },
    [handleQueryError, toast]
  );

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
      queryCache: new QueryCache({ onError: handleQueryError as any }),
      mutationCache: new MutationCache({ onError: handleMutationError as any }),
    });
  }, []); // eslint-disable-line

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
