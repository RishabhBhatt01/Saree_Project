import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ThreadDivider from "../components/ThreadDivider";

// Placeholder only — no order-placement endpoint exists on the backend yet.
// Once POST /api/orders (or similar) is built, wire the "Place order" button
// to it and redirect to a real confirmation page.
export default function Checkout() {
  const { items } = useCart();

  const total = items.reduce((sum, item) => {
    const price = item.sareeId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">Checkout</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Order placement isn't connected yet — this is a preview of the flow.
      </p>
      <ThreadDivider variant="teal" />

      <div className="mt-8 space-y-3">
        {items.map((item) => {
          const saree = item.sareeId;
          if (!saree) return null;
          return (
            <div
              key={saree._id}
              className="flex justify-between font-body text-sm text-ink/70"
            >
              <span>
                {saree.name} × {item.quantity}
              </span>
              <span className="tabular-nums">
                ₹{(saree.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-ink/10">
        <span className="font-display text-xl">Total</span>
        <span className="font-display text-xl tabular-nums">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        disabled
        title="Order placement isn't built on the backend yet"
        className="w-full bg-ink/20 text-ink/50 py-3 font-body mt-8 cursor-not-allowed"
      >
        Place order (coming soon)
      </button>

      <p className="text-center font-body text-sm mt-4">
        <Link to="/cart" className="text-oxblood hover:underline">
          Back to cart
        </Link>
      </p>
    </div>
  );
}
