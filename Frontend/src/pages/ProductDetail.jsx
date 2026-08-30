import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneSaree } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThreadDivider from "../components/ThreadDivider";

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] bg-sand overflow-hidden">
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

      <div>
        <h1 className="font-display text-3xl mb-2">{saree.name}</h1>
        <p className="font-body text-xs uppercase tracking-wide text-ink/50 mb-4">
          {saree.fabric} {saree.category ? `· ${saree.category}` : ""}
        </p>
        <p className="font-display text-2xl text-oxblood tabular-nums mb-6">
          ₹{Number(saree.price).toLocaleString("en-IN")}
        </p>

        <ThreadDivider variant="gold" />

        <p className="font-body text-ink/70 leading-relaxed mt-6 mb-8">
          {saree.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full md:w-auto bg-oxblood text-ivory px-8 py-3 font-body hover:bg-oxblood-dark transition-colors disabled:opacity-50"
        >
          {adding ? "Adding…" : "Add to cart"}
        </button>

        {message && (
          <p className="font-body text-sm text-teal mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
