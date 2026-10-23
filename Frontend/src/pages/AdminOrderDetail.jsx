import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleOrderDetailsAdmin, updateOrderStatus } from "../api/client";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { primaryBtn } from "../components/AuthLayout";

// Mirrors the backend's allowed forward-only transitions
const NEXT_STATUS = {
  Pending: "Confirmed",
  Confirmed: "Shipped",
  Shipped: "Delivered",
  Delivered: null,
};

const card = "rounded-2xl border border-dashed border-clay/40 bg-ivory p-5";

export default function AdminOrderDetail() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadOrder = () => {
    setLoading(true);
    getSingleOrderDetailsAdmin(orderId)
      .then((res) => setOrder(res.data.order))
      .catch(() => setError("Couldn't load this order."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleAdvanceStatus = async () => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    setUpdating(true);
    setError("");
    try {
      await updateOrderStatus(orderId, next);
      await loadOrder();
    } catch (err) {
      setError(err.response?.data?.error || "Couldn't update status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <p className="py-20 text-center font-body text-ink/50">Loading order…</p>
    );
  }

  if (error && !order) {
    return (
      <p className="py-20 text-center font-body text-oxblood">{error}</p>
    );
  }

  if (!order) return null;

  const nextStatus = NEXT_STATUS[order.status];

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          to="/admin/orders"
          className="font-body text-sm text-clay hover:underline"
        >
          ← Back to all orders
        </Link>

        <div className="mt-4">
          <PageHeader
            eyebrow={`Order #${order._id.slice(-6).toUpperCase()}`}
            title="Order detail"
            subtitle={order._id}
            action={<StatusBadge status={order.status} />}
          />
        </div>

        <div className="space-y-5">
          <div className={card}>
            <h2 className="mb-2 font-display text-xl">Customer</h2>
            <p className="font-body text-sm text-ink/70">
              {order.userId?.username} · {order.userId?.email}
            </p>
          </div>

          <div className={card}>
            <h2 className="mb-2 font-display text-xl">Shipping address</h2>
            <p className="font-body text-sm text-ink/70">
              {order.shippingAddress.fullName} · {order.shippingAddress.phone}
              <br />
              {order.shippingAddress.addressLine}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
          </div>

          <div className={card}>
            <h2 className="mb-3 font-display text-xl">Items</h2>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b border-clay/15 pb-3"
                >
                  <div className="h-20 w-14 shrink-0 overflow-hidden rounded-t-full border border-clay/30 bg-sand">
                    {item.sareeId?.sareeImg && (
                      <img
                        src={item.sareeId.sareeImg}
                        alt={item.sareeId?.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 font-body text-sm">
                    <p>{item.sareeId?.name || "(saree removed)"}</p>
                    <p className="text-ink/50">Qty {item.quantity}</p>
                  </div>
                  <p className="font-body text-sm tabular-nums">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-display text-xl">
              <span>Total</span>
              <span className="tabular-nums text-clay">
                ₹{Number(order.totalAmount).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 font-body text-sm text-oxblood" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8">
          {nextStatus ? (
            <button
              onClick={handleAdvanceStatus}
              disabled={updating}
              className={`${primaryBtn} sm:w-auto sm:px-10`}
            >
              {updating ? "Updating…" : `Mark as ${nextStatus}`}
            </button>
          ) : (
            <p className="font-body text-sm text-ink/50">
              This order has reached its final status.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}