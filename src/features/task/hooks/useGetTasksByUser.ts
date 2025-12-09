import { getTasksByUser } from "@/api/task";
import type { ITask } from "@/api/task/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetTasksByUser = (
  userId: string,
  enabled = true
): UseQueryResult<ITask[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEY.TASK.LIST, userId],
    queryFn: () => getTasksByUser(userId),
    enabled: !!userId && enabled,
  });
};
