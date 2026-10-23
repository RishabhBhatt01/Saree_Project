import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreadDivider from "../components/ThreadDivider";
import ResendVerification from "../components/ResendVerification";
import AuthLayout, { inputClass, primaryBtn } from "../components/AuthLayout";

export default function Register() {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // When set, the "check your email" screen is shown instead of the form
  const [sent, setSent] = useState(null); // { notice, justSent }

  const cleanEmail = email.trim().toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(username.trim(), cleanEmail, password);
      setSent({
        notice: `We've sent a verification link to ${cleanEmail}. It expires in 30 minutes.`,
        justSent: true,
      });
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 502) {
        setSent({ notice: data.message, justSent: false });
      } else if (data?.code === "EMAIL_NOT_VERIFIED") {
        setSent({ notice: data.message, justSent: false });
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-24 w-20 items-center justify-center rounded-t-full border border-dashed border-clay/50 bg-linen">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A8552F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </div>
          <h1 className="font-display text-3xl">Check your email</h1>
          <p className="mb-5 mt-2 font-body text-sm text-ink/60">
            {sent.notice}
          </p>
          <ThreadDivider variant="gold" />
          <div className="mt-7 flex flex-col items-center gap-3">
            <ResendVerification
              email={cleanEmail}
              initialCooldown={sent.justSent ? 60 : 0}
            />
            <Link
              to="/login"
              className="font-body text-sm text-ink/60 hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-3xl">Create an account</h1>
      <p className="mb-5 mt-1 font-body text-sm text-ink/60">
        Join Thread Sutra and start your collection.
      </p>
      <ThreadDivider variant="gold" />

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label className="mb-1.5 block font-body text-sm" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            placeholder="rishabh"
          />
        </div>

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
            placeholder="At least 6 characters"
          />
        </div>

        {error && (
          <p className="font-body text-sm text-oxblood" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting} className={primaryBtn}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-ink/60">
        Already have an account?{" "}
        <Link to="/login" className="text-clay hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}