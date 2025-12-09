import { updateStatus } from "@/api/status";
import type { IUpdateStatus } from "@/api/status/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export const useUpdateStatus = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
): UseMutationResult<boolean, Error, { userId: string; statusId: string; data: IUpdateStatus }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, statusId, data }) => updateStatus(userId, statusId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.STATUS.LIST, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.STATUS.DETAIL, variables.userId, variables.statusId],
      });
      onSuccess?.();
    },
    onError,
  });
};
