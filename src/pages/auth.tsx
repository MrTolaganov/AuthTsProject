import { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";

export default function Auth() {
  const [auth, setAuth] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { isLoading, error } = useAuthStore();
  const { signUp, signIn } = useAuth();

  const toggleAuth = (state: "signin" | "signup") => {
    setAuth(state);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setIsInvalid(true);
    }
    if (auth === "signin") {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
  };


  return (
    <main className="form-signin w-100 m-auto py-5">
      <form className="w-25 mx-auto py-5" onSubmit={submitHandler}>
        <div className="d-flex flex-column align-items-center">
          <img
            className="mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">
            Sign {auth === "signin" ? "In" : "Up"}
          </h1>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          className="btn btn-primary w-100 py-2 mb-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>Sign {auth === "signin" ? "In" : "Up"}</>
          )}
        </button>
        {auth === "signin" ? (
          <p className="text-secondary">
            Don't have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => toggleAuth("signup")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-secondary">
            Have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => toggleAuth("signin")}
            >
              Sign In
            </span>
          </p>
        )}
      </form>
    </main>
  );
}
