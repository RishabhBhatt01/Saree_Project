import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

const STATUS_COLORS = {
  Pending: "bg-gold/20 text-gold",
  Confirmed: "bg-teal/10 text-teal",
  Shipped: "bg-teal/10 text-teal",
  Delivered: "bg-oxblood/10 text-oxblood",
};

function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] || "bg-ink/10 text-ink/60";
  return (
    <span className={`px-2 py-0.5 text-xs font-body rounded-sm ${cls}`}>
      {status || "Pending"}
    </span>
  );
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then((res) => setOrders(res.data.orders || []))
      .catch(() => setError("Couldn't load your orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">My orders</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Your past purchases from Thread Sutra.
      </p>
      <ThreadDivider variant="teal" />

      {loading && (
        <p className="text-ink/50 font-body text-sm mt-8">Loading orders…</p>
      )}
      {error && <p className="text-oxblood font-body text-sm mt-8">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-ink/60 font-body mb-4">
            You haven't placed any orders yet.
          </p>
          <Link to="/" className="text-oxblood font-body hover:underline">
            Browse sarees
          </Link>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-ink/10 p-5">
            <div className="flex justify-between items-start mb-3">
              <p className="font-body text-xs text-ink/50">
                Order ID: {order._id}
              </p>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <p className="font-display text-lg tabular-nums">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-ink/70">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·
              Shipping to {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
