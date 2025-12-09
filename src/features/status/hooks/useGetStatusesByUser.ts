import { getStatusesByUser } from "@/api/status";
import type { IStatus } from "@/api/status/type";
import { QUERY_KEY } from "@/libs/react-query/constants";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetStatusesByUser = (
  userId: string,
  enabled = true
): UseQueryResult<IStatus[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEY.STATUS.LIST, userId],
    queryFn: () => getStatusesByUser(userId),
    enabled: !!userId && enabled,
  });
};
