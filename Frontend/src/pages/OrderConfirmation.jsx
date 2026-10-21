import { Link, useLocation, Navigate } from "react-router-dom";
import ThreadDivider from "../components/ThreadDivider";

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // If someone lands here directly (no order in state), send them home.
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <h1 className="font-display text-3xl mb-2">Order placed</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Thank you — your sarees are on their way.
      </p>
      <ThreadDivider variant="gold" />

      <div className="mt-8 text-left border border-ink/10 p-5 space-y-2">
        <div className="flex justify-between items-center">
          <p className="font-body text-sm text-ink/60">
            Order ID:{" "}
            <span className="text-ink font-medium">{order._id}</span>
          </p>
          <span className="px-2 py-0.5 text-xs font-body rounded-sm bg-gold/20 text-gold">
            {order.status || "Pending"}
          </span>
        </div>
        {order.items.map((item) => (
          <div
            key={item.sareeId}
            className="flex justify-between font-body text-sm text-ink/70"
          >
            <span>Qty {item.quantity}</span>
            <span className="tabular-nums">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-2 border-t border-ink/10 font-display text-lg">
          <span>Total</span>
          <span className="tabular-nums">
            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Link
          to="/orders"
          className="block text-oxblood font-body text-sm hover:underline"
        >
          View my orders
        </Link>
        <Link to="/" className="block text-ink/60 font-body text-sm hover:underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
