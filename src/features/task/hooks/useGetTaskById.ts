import { getTaskById } from "@/api/task";
import type { ITask } from "@/api/task/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetTaskById = (
  userId: string,
  taskId: string,
  enabled = true
): UseQueryResult<ITask | null, Error> => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.DETAIL, userId, taskId],
    queryFn: () => getTaskById(userId, taskId),
    enabled: !!userId && !!taskId && enabled,
  });
};
