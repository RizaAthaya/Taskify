import { createTask } from "@/api/task";
import type { ICreateTask } from "@/api/task/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = (
  onSuccess?: (id: string) => void,
  onError?: (err: Error) => void
): UseMutationResult<string, Error, { userId: string; data: ICreateTask }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }) => createTask(userId, data),
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TASK.LIST],
      });
      onSuccess?.(id);
    },
    onError,
  });
};
