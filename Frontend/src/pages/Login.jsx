import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreadDivider from "../components/ThreadDivider";
import ResendVerification from "../components/ResendVerification";
import AuthLayout, { inputClass, primaryBtn } from "../components/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNeedsVerification(false);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const data = err.response?.data;
      if (data?.code === "EMAIL_NOT_VERIFIED") setNeedsVerification(true);
      setError(data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="font-display text-3xl">Welcome back</h1>
      <p className="mb-5 mt-1 font-body text-sm text-ink/60">
        Sign in to continue your collection.
      </p>
      <ThreadDivider variant="gold" />

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label className="mb-1.5 block font-body text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-body text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="font-body text-sm text-oxblood" role="alert">
            {error}
          </p>
        )}

        {needsVerification && (
          <ResendVerification email={email.trim().toLowerCase()} />
        )}

        <button type="submit" disabled={submitting} className={primaryBtn}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-ink/60">
        New to Thread Sutra?{" "}
        <Link to="/register" className="text-clay hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}