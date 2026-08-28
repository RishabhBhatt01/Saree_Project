import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThreadDivider from "../components/ThreadDivider";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register(username, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      const data = err.response?.data;
      setError(data?.error || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-1">Create an account</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Join Thread Sutra.
      </p>
      <ThreadDivider variant="teal" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block font-body text-sm mb-1.5" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
            placeholder="rishabh"
          />
        </div>

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
            placeholder="At least 6 characters"
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
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center font-body text-sm text-ink/60 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-oxblood hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
