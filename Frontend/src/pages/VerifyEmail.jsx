import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/client";
import ResendVerification from "../components/ResendVerification";
import ThreadDivider from "../components/ThreadDivider";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const [status, setStatus] = useState(token && email ? "loading" : "invalid");
  const [message, setMessage] = useState("");
  const called = useRef(false); // avoids a double call in React StrictMode

  useEffect(() => {
    if (status !== "loading" || called.current) return;
    called.current = true;
    verifyEmail(token, email)
      .then((res) => {
        setMessage(res.data.message);
        setStatus("success");
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Verification failed.");
        setStatus("error");
      });
  }, []);

  return (
    <div className="max-w-md mx-auto px-6 py-20 text-center">
      {status === "loading" && (
        <p className="font-body text-ink/60">Verifying your email…</p>
      )}

      {status === "success" && (
        <>
          <h1 className="font-display text-3xl mb-2">Email verified</h1>
          <p className="text-ink/60 font-body text-sm mb-6">{message}</p>
          <ThreadDivider variant="gold" />
          <Link
            to="/login"
            className="inline-block mt-8 bg-oxblood text-ivory px-8 py-3 font-body hover:bg-oxblood-dark transition-colors"
          >
            Continue to sign in
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="font-display text-3xl mb-2">Verification failed</h1>
          <p className="text-oxblood font-body text-sm mb-6" role="alert">
            {message}
          </p>
          <ThreadDivider variant="oxblood" />
          <div className="mt-8 flex flex-col items-center gap-3">
            <ResendVerification email={email} />
            <Link to="/login" className="text-ink/60 font-body text-sm hover:underline">
              Back to sign in
            </Link>
          </div>
        </>
      )}

      {status === "invalid" && (
        <>
          <h1 className="font-display text-3xl mb-2">Incomplete link</h1>
          <p className="text-ink/60 font-body text-sm mb-6">
            This verification link is missing information. Please use the
            link from your email, or sign in to request a new one.
          </p>
          <Link to="/login" className="text-oxblood font-body text-sm hover:underline">
            Go to sign in
          </Link>
        </>
      )}
    </div>
  );
}
