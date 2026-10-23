import { Link, useLocation, Navigate } from "react-router-dom";
import ThreadDivider from "../components/ThreadDivider";
import StatusBadge from "../components/StatusBadge";

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // Landed here directly (no order in state): send home.
  if (!order) return <Navigate to="/" replace />;

  const addr = order.shippingAddress;
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <div className="mx-auto mb-5 flex h-32 w-28 items-center justify-center rounded-t-full border-2 border-dashed border-clay/60 bg-teal">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FAF6F0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl">Thank you!</h1>
        <p className="mb-6 mt-2 font-body text-sm text-ink/60">
          Your payment was successful. We'll start preparing your order.
        </p>
        <ThreadDivider variant="gold" />

        <div className="mt-8 space-y-4 rounded-2xl border border-dashed border-clay/40 bg-ivory p-6 text-left">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-ink/50">
                Order ID
              </p>
              <p className="break-all font-body text-sm font-medium text-ink">
                {order._id}
              </p>
            </div>
            <StatusBadge status={order.status || "Pending"} />
          </div>

          <div className="space-y-2 border-t border-clay/20 pt-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between font-body text-sm text-ink/70"
              >
                <span>
                  Item {idx + 1} × {item.quantity}
                </span>
                <span className="tabular-nums">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <p className="font-body text-xs text-ink/50">
              {itemCount} {itemCount === 1 ? "saree" : "sarees"} in total
            </p>
          </div>

          <div className="flex justify-between border-t border-clay/20 pt-4 font-display text-xl">
            <span>Total paid</span>
            <span className="tabular-nums text-clay">
              ₹{Number(order.totalAmount).toLocaleString("en-IN")}
            </span>
          </div>

          {addr && (
            <div className="border-t border-clay/20 pt-4 font-body text-sm text-ink/70">
              <p className="mb-1 text-xs uppercase tracking-wide text-ink/50">
                Delivering to
              </p>
              <p className="font-medium text-ink">{addr.fullName}</p>
              <p>
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p>{addr.phone}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/orders"
            className="rounded-full bg-teal px-8 py-2.5 font-body text-sm text-ivory hover:bg-teal-dark"
          >
            View my orders
          </Link>
          <Link to="/" className="font-body text-sm text-ink/60 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}