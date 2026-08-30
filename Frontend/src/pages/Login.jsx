import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreadDivider from "../components/ThreadDivider";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 404) setError(data?.message || "No account found with that email.");
      else if (status === 401) setError(data?.message || "Incorrect password.");
      else setError(data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-1">Welcome back</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Sign in to Thread Sutra.
      </p>
      <ThreadDivider variant="teal" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block font-body text-sm mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-oxblood text-sm font-body" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-oxblood text-ivory py-3 font-body hover:bg-oxblood-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center font-body text-sm text-ink/60 mt-6">
        New to Thread Sutra?{" "}
        <Link to="/register" className="text-oxblood hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
