import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  isLoading: boolean;
  user: User;
  error: string;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User) => void;
  setError: (error: string) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoading: false,
  user: {} as User,
  error: "",
  setIsLoading: isLoading => set(state => ({ ...state, isLoading })),
  setUser: user => set(state => ({ ...state, user })),
  setError: error => set(state => ({ ...state, error })),
}));
