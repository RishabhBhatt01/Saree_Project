import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageHeader from "../components/PageHeader";
import { primaryBtn } from "../components/AuthLayout";
import ThreadDivider from "../components/ThreadDivider";

const qtyBtn =
  "h-8 w-8 rounded-full border border-clay/40 font-body transition hover:border-clay hover:bg-clay/10 disabled:opacity-30";

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

  const total = items.reduce(
    (sum, item) => sum + (item.sareeId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <PageHeader
          eyebrow="Your bag"
          title="Your cart"
          subtitle="Review your sarees before checkout."
        />

        {loading && (
          <p className="font-body text-sm text-ink/50">Loading cart…</p>
        )}

        {!loading && items.length === 0 && (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-clay/40 bg-ivory px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-32 w-28 items-center justify-center rounded-t-full border-2 border-dashed border-clay/50 bg-linen">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A8552F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 7h12l1 13H5L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </div>
            <h2 className="font-display text-2xl">Your bag is empty</h2>
            <p className="mb-5 mt-2 font-body text-sm text-ink/60">
              Every saree begins as a single thread. Find the one that's yours.
            </p>
            <ThreadDivider variant="gold" />
            <div className="mt-6 flex flex-col items-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-teal px-8 py-2.5 font-body text-sm text-ivory hover:bg-teal-dark"
              >
                Browse sarees
              </Link>
              <Link
                to="/orders"
                className="font-body text-sm text-ink/60 hover:underline"
              >
                View my orders
              </Link>
            </div>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => {
                const saree = item.sareeId;
                if (!saree) return null;
                const isBusy = busyId === saree._id;
                return (
                  <div
                    key={saree._id}
                    className="flex items-center gap-5 rounded-2xl border border-dashed border-clay/40 bg-ivory p-4"
                  >
                    <div className="h-28 w-20 shrink-0 overflow-hidden rounded-t-full border border-clay/30 bg-sand">
                      {saree.sareeImg && (
                        <img
                          src={saree.sareeImg}
                          alt={saree.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display text-lg">{saree.name}</h3>
                      <p className="mt-0.5 font-body text-sm text-ink/50">
                        ₹{Number(saree.price).toLocaleString("en-IN")} each
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => handleQuantity(saree._id, -1)}
                          disabled={isBusy || item.quantity <= 1}
                          className={qtyBtn}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-body tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantity(saree._id, 1)}
                          disabled={isBusy}
                          className={qtyBtn}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(saree._id)}
                          disabled={isBusy}
                          className="ml-3 font-body text-sm text-ink/50 underline hover:text-clay"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="font-display text-lg tabular-nums text-clay">
                      ₹{(saree.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
            </div>

            <aside className="h-fit rounded-2xl border border-dashed border-clay/40 bg-linen p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl">Summary</h2>
              <div className="mt-4 flex justify-between font-body text-sm text-ink/70">
                <span>Items</span>
                <span className="tabular-nums">
                  {items.reduce((n, i) => n + i.quantity, 0)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-clay/20 pt-3">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl tabular-nums text-clay">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className={`${primaryBtn} mt-5`}
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}