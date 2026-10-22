import { useEffect, useState } from "react";
import { resendVerification } from "../api/client";

export default function ResendVerification({ email, initialCooldown = 0 }) {
  const [cooldown, setCooldown] = useState(initialCooldown);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleResend = async () => {
    setSending(true);
    setFeedback({ type: "", text: "" });
    try {
      const res = await resendVerification(email);
      setFeedback({ type: "ok", text: res.data.message });
      setCooldown(60);
    } catch (err) {
      setFeedback({
        type: "err",
        text:
          err.response?.data?.message ||
          "Couldn't send the email. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleResend}
        disabled={sending || cooldown > 0}
        className="text-oxblood font-body text-sm hover:underline disabled:opacity-50 disabled:no-underline"
      >
        {sending
          ? "Sending…"
          : cooldown > 0
          ? `Resend available in ${cooldown}s`
          : "Resend verification email"}
      </button>
      {feedback.text && (
        <p
          role="status"
          className={`font-body text-sm mt-2 ${
            feedback.type === "ok" ? "text-teal" : "text-oxblood"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}
