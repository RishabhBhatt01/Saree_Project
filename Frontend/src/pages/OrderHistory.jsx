import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/client";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

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
    <div className="bg-weave">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <PageHeader
          eyebrow="Your purchases"
          title="My orders"
          subtitle="Your past purchases from Thread Sutra."
        />

        {loading && (
          <p className="font-body text-sm text-ink/50">Loading orders…</p>
        )}
        {error && <p className="font-body text-sm text-oxblood">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="mx-auto max-w-sm rounded-2xl border border-dashed border-clay/40 bg-ivory p-10 text-center">
            <div className="mx-auto mb-4 h-20 w-16 rounded-t-full border border-dashed border-clay/50 bg-linen" />
            <p className="mb-4 font-body text-ink/60">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="rounded-full bg-teal px-6 py-2.5 font-body text-sm text-ivory hover:bg-teal-dark"
            >
              Browse sarees
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-dashed border-clay/40 bg-ivory p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  {order.createdAt && (
                    <p className="font-body text-xs text-ink/50">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <p className="font-display text-xl tabular-nums text-clay">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <p className="mt-3 font-body text-sm text-ink/70">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·
                Shipping to {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}