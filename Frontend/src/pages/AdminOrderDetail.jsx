import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSingleOrderDetailsAdmin, updateOrderStatus } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

const STATUS_COLORS = {
  Pending: "bg-gold/20 text-gold",
  Confirmed: "bg-teal/10 text-teal",
  Shipped: "bg-teal/10 text-teal",
  Delivered: "bg-oxblood/10 text-oxblood",
};

// Mirrors the backend's allowed forward-only transitions
const NEXT_STATUS = {
  Pending: "Confirmed",
  Confirmed: "Shipped",
  Shipped: "Delivered",
  Delivered: null,
};

function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] || "bg-ink/10 text-ink/60";
  return (
    <span className={`px-2.5 py-1 text-xs font-body rounded-sm ${cls}`}>
      {status}
    </span>
  );
}

export default function AdminOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

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
    return <p className="text-center py-20 text-ink/50 font-body">Loading order…</p>;
  }

  if (error && !order) {
    return <p className="text-center py-20 text-oxblood font-body">{error}</p>;
  }

  if (!order) return null;

  const nextStatus = NEXT_STATUS[order.status];

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <Link to="/admin/orders" className="text-oxblood font-body text-sm hover:underline">
        ← Back to all orders
      </Link>

      <div className="flex items-center justify-between mt-4 mb-1">
        <h1 className="font-display text-3xl">Order detail</h1>
        <StatusBadge status={order.status} />
      </div>
      <p className="text-ink/60 font-body text-sm mb-6">{order._id}</p>
      <ThreadDivider variant="teal" />

      {/* Customer */}
      <div className="mt-8">
        <h2 className="font-display text-xl mb-3">Customer</h2>
        <p className="font-body text-sm text-ink/70">
          {order.userId?.username} · {order.userId?.email}
        </p>
      </div>

      {/* Shipping address */}
      <div className="mt-8">
        <h2 className="font-display text-xl mb-3">Shipping address</h2>
        <p className="font-body text-sm text-ink/70">
          {order.shippingAddress.fullName} · {order.shippingAddress.phone}
          <br />
          {order.shippingAddress.addressLine}, {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} - {order.shippingAddress.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="mt-8">
        <h2 className="font-display text-xl mb-3">Items</h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 border-b border-ink/10 pb-3"
            >
              <div className="w-14 h-16 bg-sand overflow-hidden shrink-0">
                {item.sareeId?.sareeImg && (
                  <img
                    src={item.sareeId.sareeImg}
                    alt={item.sareeId?.name}
                    className="w-full h-full object-cover"
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

        <div className="flex justify-between items-center mt-4 pt-2 font-display text-lg">
          <span>Total</span>
          <span className="tabular-nums">
            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {error && (
        <p className="text-oxblood text-sm font-body mt-4" role="alert">
          {error}
        </p>
      )}

      {/* Status action */}
      <div className="mt-10">
        {nextStatus ? (
          <button
            onClick={handleAdvanceStatus}
            disabled={updating}
            className="bg-oxblood text-ivory px-6 py-3 font-body hover:bg-oxblood-dark transition-colors disabled:opacity-50"
          >
            {updating ? "Updating…" : `Mark as ${nextStatus}`}
          </button>
        ) : (
          <p className="text-ink/50 font-body text-sm">
            This order has reached its final status.
          </p>
        )}
      </div>
    </div>
  );
}
