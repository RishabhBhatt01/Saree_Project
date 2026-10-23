import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOneSaree, deleteSaree } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThreadDivider from "../components/ThreadDivider";

const perks = [
  { title: "Handloom", text: "Woven by skilled artisans" },
  { title: "Carefully packed", text: "Wrapped to arrive fresh" },
  { title: "Curated", text: "Chosen by one seller" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [saree, setSaree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  const isAdminUser = user?.role === "admin";

  useEffect(() => {
    getOneSaree(id)
      .then((res) => setSaree(res.data.saree))
      .catch(() => setError("Couldn't load this saree."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    setAdding(true);
    setMessage("");
    try {
      await addItem(saree._id, 1);
      setMessage("Added to cart.");
    } catch {
      setMessage("Couldn't add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this saree? It will be hidden from the shop."))
      return;
    setDeleting(true);
    try {
      await deleteSaree(id);
      navigate("/");
    } catch {
      setMessage("Couldn't delete saree.");
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20 text-ink/50 font-body">Loading…</p>;
  }

  if (error || !saree) {
    return (
      <p className="text-center py-20 text-oxblood font-body">
        {error || "Saree not found."}
      </p>
    );
  }

  const outOfStock = Number(saree.stock) <= 0;
  const lowStock = !outOfStock && Number(saree.stock) <= 5;

  return (
    <div className="bg-weave">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="font-body text-sm text-ink/60 hover:text-clay transition-colors"
        >
          ← Back to collection
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-start">
        {/* Image in arch frame */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-t-full bg-turmeric/25" />
          <div className="relative rounded-t-full border border-dashed border-clay/60 bg-ivory p-3 shadow-lg">
            <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
              {saree.sareeImg ? (
                <img
                  src={saree.sareeImg}
                  alt={saree.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink/30 font-body text-sm">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {saree.fabric && (
              <span className="bg-teal text-ivory font-body text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                {saree.fabric}
              </span>
            )}
            {saree.category && (
              <span className="border border-clay/50 text-clay font-body text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                {saree.category}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl leading-tight">{saree.name}</h1>
          <p className="font-display text-3xl text-clay tabular-nums mt-3">
            ₹{Number(saree.price).toLocaleString("en-IN")}
          </p>

          {outOfStock && (
            <p className="font-body text-sm text-oxblood mt-2">Out of stock</p>
          )}
          {lowStock && (
            <p className="font-body text-sm text-clay mt-2">
              Only {saree.stock} left
            </p>
          )}

          <div className="my-6">
            <ThreadDivider variant="gold" />
          </div>

          <h2 className="font-display text-lg text-clay mb-2">The story</h2>
          <p className="font-body text-ink/70 leading-relaxed mb-8">
            {saree.description}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={adding || outOfStock}
            className="w-full md:w-auto rounded-full bg-teal text-ivory px-10 py-3 font-body hover:bg-teal-dark transition-colors disabled:opacity-50"
          >
            {outOfStock ? "Out of stock" : adding ? "Adding…" : "Add to cart"}
          </button>

          {message && (
            <p className="font-body text-sm text-teal mt-3">{message}</p>
          )}

          {isAdminUser && (
            <div className="mt-6 flex items-center gap-4 border-t border-dashed border-clay/30 pt-4">
              <Link
                to={`/admin/edit-saree/${saree._id}`}
                className="rounded-full border border-clay px-6 py-2 font-body text-sm text-clay hover:bg-clay/10"
              >
                Edit saree
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="font-body text-sm text-oxblood underline disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mt-10">
            {perks.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-dashed border-clay/40 bg-linen p-3 text-center"
              >
                <p className="font-display text-sm text-clay">{p.title}</p>
                <p className="font-body text-[11px] text-ink/60 mt-0.5">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}