import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function useAuth() {
  const { isLoading, user, error, setIsLoading, setUser, setError } =
    useAuthStore();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        navigate("/");
        setUser(res.user);
      })
      .catch(err => {
        const error = err as Error;
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        navigate("/");
        setUser(res.user);
      })
      .catch(err => {
        const error = err as Error;
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOut = async () => {
    setIsLoading(true);
    await signOut(auth)
      .then(() => {
        setUser({} as User);
        navigate("/auth");
      })
      .catch(err => {
        const error = err as Error;
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return { signIn, signUp, logOut, isLoading, user, error };
}
