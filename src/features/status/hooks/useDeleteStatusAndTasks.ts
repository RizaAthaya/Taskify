import { deleteStatusAndTasks } from "@/api/status";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export const useDeleteStatusAndTasks = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
): UseMutationResult<boolean, Error, { userId: string; statusId: string }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, statusId }) => deleteStatusAndTasks(userId, statusId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.STATUS.LIST, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.LIST, variables.userId],
      });
      onSuccess?.();
    },
    onError,
  });
};
