import { signInWithGoogle } from "@/api/auth";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UserCredential } from "firebase/auth";

export const useLoginWithGoogle = (
  onSuccess?: (data: UserCredential) => void,
  onError?: (error: Error) => void
): UseMutationResult<UserCredential, Error, void> => {
  return useMutation<UserCredential, Error, void>({
    mutationFn: async () => {
      return await signInWithGoogle();
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },

    onError: (error) => {
      onError?.(error);
    },
  });
};
