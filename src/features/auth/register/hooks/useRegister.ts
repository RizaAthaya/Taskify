import { registerWithEmail } from "@/api/auth";
import type { IRegisterEmailPassword } from "@/api/auth/type";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { UserCredential } from "firebase/auth";

export const useRegister = (
  onSuccess?: (data: UserCredential) => void,
  onError?: (error: Error) => void
): UseMutationResult<UserCredential, Error, IRegisterEmailPassword> => {
  return useMutation<UserCredential, Error, IRegisterEmailPassword>({
    mutationFn: (payload) => registerWithEmail(payload),

    onSuccess: (data) => {
      onSuccess?.(data);
    },

    onError: (error) => {
      onError?.(error);
    },
  });
};
