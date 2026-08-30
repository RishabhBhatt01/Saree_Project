import { Link } from "react-router-dom";

export default function ProductCard({ saree }) {
  return (
    <Link
      to={`/product/${saree._id}`}
      className="group block"
    >
      <div className="aspect-[3/4] overflow-hidden bg-sand mb-3">
        {saree.sareeImg ? (
          <img
            src={saree.sareeImg}
            alt={saree.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink/30 font-body text-sm">
            No image
          </div>
        )}
      </div>
      <h3 className="font-display text-lg text-ink leading-snug">
        {saree.name}
      </h3>
      <p className="font-body text-xs uppercase tracking-wide text-ink/50 mt-0.5">
        {saree.fabric} {saree.category ? `· ${saree.category}` : ""}
      </p>
      <p className="font-body text-sm text-oxblood mt-1 tabular-nums">
        ₹{Number(saree.price).toLocaleString("en-IN")}
      </p>
    </Link>
  );
}
