import { auth } from "@/libs/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./useUser";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // states
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // logout
  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  // refresh user
  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();

      setUser({
        ...auth.currentUser,
      });
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
    <UserContext.Provider value={{ user, loading, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
