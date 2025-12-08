import { createContext, useContext } from "react";
import type { TUserContext } from "./type";

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
