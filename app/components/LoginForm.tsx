import { signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [signInError, setSignInError] = useState<string | null>(null); // Utilisation d'un nom différent pour l'état d'erreur

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: true,
        username: formValues.username,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        setFormValues({ username: "", password: "" });
        redirect(callbackUrl);
      } else {
        setSignInError("Invalid username or password");
      }
    } catch (error: any) {
      setLoading(false);
      setSignInError(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadow p-3 rounded">
        <form
          className="flex items-center flex-col gap-1"
          method="POST"
          onSubmit={onSubmit}
        >
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Username</span>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Password</span>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Afficher l'erreur */}
          {signInError && <div className="text-danger">{signInError}</div>}{" "}
          <input
            className="btn btn-primary"
            type="submit"
            value={loading ? "loading..." : "Sign In"}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
