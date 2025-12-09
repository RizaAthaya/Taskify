import { deleteTask } from "@/api/task";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

export const useDeleteTask = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
): UseMutationResult<boolean, Error, { userId: string; taskId: string }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, taskId }) => deleteTask(userId, taskId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.LIST, variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.DETAIL, variables.userId, variables.taskId],
      });
      onSuccess?.();
    },
    onError,
  });
};
