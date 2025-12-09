import { updateTask } from "@/api/task";
import type { IUpdateTask } from "@/api/task/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export const useUpdateTask = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
): UseMutationResult<boolean, Error, { userId: string; taskId: string; data: IUpdateTask }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, taskId, data }) => updateTask(userId, taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.LIST, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.DETAIL],
      });
      onSuccess?.();
    },
    onError,
  });
};
