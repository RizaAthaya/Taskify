import { loginWithEmail } from "@/api/auth";
import type { ILoginEmailPassword } from "@/api/auth/type";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UserCredential } from "firebase/auth";

export const useLogin = (
  onSuccess?: (data: UserCredential) => void,
  onError?: (error: Error) => void
): UseMutationResult<UserCredential, Error, ILoginEmailPassword> => {
  return useMutation<UserCredential, Error, ILoginEmailPassword>({
    mutationFn: (payload) => loginWithEmail(payload),

    onSuccess: (data) => {
      onSuccess?.(data);
    },

    onError: (error) => {
      onError?.(error);
    },
  });
};
