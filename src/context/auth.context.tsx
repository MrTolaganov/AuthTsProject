import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface AuthContextState {
  isLoading: boolean;
  user: User;
}

const AuthContext = createContext<AuthContextState>({
  isLoading: false,
  user: {} as User,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { user, isLoading, setUser, setIsLoading } = useAuthStore();
  const value = useMemo(() => ({ user, isLoading }), [user, isLoading]);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate("/");
        setUser(user);
      } else {
        setUser({} as User);
        navigate("/auth");
      }
    });
    setInitialLoading(false);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {initialLoading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};
