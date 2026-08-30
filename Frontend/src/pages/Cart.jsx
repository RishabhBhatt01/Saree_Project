import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ThreadDivider from "../components/ThreadDivider";

export default function Cart() {
  const { items, loading, refreshCart, changeQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const handleQuantity = async (sareeId, delta) => {
    setBusyId(sareeId);
    try {
      await changeQuantity(sareeId, delta);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (sareeId) => {
    setBusyId(sareeId);
    try {
      await removeItem(sareeId);
    } finally {
      setBusyId(null);
    }
  };

  const total = items.reduce((sum, item) => {
    const price = item.sareeId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">Your cart</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Review your sarees before checkout.
      </p>
      <ThreadDivider variant="teal" />

      {loading && (
        <p className="text-ink/50 font-body text-sm mt-8">Loading cart…</p>
      )}

      {!loading && items.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-ink/60 font-body mb-4">Your cart is empty.</p>
          <Link to="/" className="text-oxblood font-body hover:underline">
            Browse sarees
          </Link>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="mt-8 space-y-6">
          {items.map((item) => {
            const saree = item.sareeId;
            if (!saree) return null;
            const isBusy = busyId === saree._id;
            return (
              <div
                key={saree._id}
                className="flex items-center gap-5 border-b border-ink/10 pb-6"
              >
                <div className="w-20 h-24 bg-sand overflow-hidden shrink-0">
                  {saree.sareeImg && (
                    <img
                      src={saree.sareeImg}
                      alt={saree.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-lg">{saree.name}</h3>
                  <p className="font-body text-sm text-ink/50 mt-0.5">
                    ₹{Number(saree.price).toLocaleString("en-IN")} each
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleQuantity(saree._id, -1)}
                      disabled={isBusy || item.quantity <= 1}
                      className="w-7 h-7 border border-ink/20 font-body hover:border-oxblood disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-body tabular-nums w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantity(saree._id, 1)}
                      disabled={isBusy}
                      className="w-7 h-7 border border-ink/20 font-body hover:border-oxblood disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemove(saree._id)}
                      disabled={isBusy}
                      className="ml-4 font-body text-sm text-ink/50 hover:text-oxblood underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-body tabular-nums text-ink">
                  ₹{(saree.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-4">
            <span className="font-display text-xl">Total</span>
            <span className="font-display text-xl tabular-nums">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-oxblood text-ivory py-3 font-body hover:bg-oxblood-dark transition-colors mt-4"
          >
            Proceed to checkout
          </button>
        </div>
      )}
    </div>
  );
}
