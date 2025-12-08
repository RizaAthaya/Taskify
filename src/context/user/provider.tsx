import { auth } from "@/libs/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./useUser";
import { log } from "@/utils/log";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // states
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // logout
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      log.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
