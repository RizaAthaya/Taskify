import { createStatus } from "@/api/status";
import type { ICreateStatus } from "@/api/status/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export const useCreateStatus = (
  onSuccess?: (id: string) => void,
  onError?: (err: Error) => void
): UseMutationResult<string, Error, { userId: string; data: ICreateStatus }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }) => createStatus(userId, data),
    onSuccess: (id, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.STATUS.LIST, variables.userId],
      });
      onSuccess?.(id);
    },
    onError,
  });
};
