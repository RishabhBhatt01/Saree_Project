import { Link } from "react-router-dom";

export default function ProductCard({ saree }) {
  const outOfStock = Number(saree.stock) <= 0;

  return (
    <Link to={`/product/${saree._id}`} className="group block text-center">
      <div className="relative mx-auto">
        <div className="relative rounded-t-full border border-dashed border-clay/50 bg-ivory p-2 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
            {saree.sareeImg ? (
              <img
                src={saree.sareeImg}
                alt={saree.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-body text-xs text-ink/30">
                No image
              </div>
            )}
          </div>
          {outOfStock && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-oxblood px-3 py-1 font-body text-[10px] uppercase tracking-widest text-ivory">
              Sold out
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        {saree.fabric && (
          <span className="inline-block rounded-full bg-teal px-3 py-0.5 font-body text-[10px] uppercase tracking-widest text-ivory">
            {saree.fabric}
          </span>
        )}
        <h3 className="mt-2 font-display text-lg leading-snug">{saree.name}</h3>
        <p className="font-display text-base tabular-nums text-clay">
          ₹{Number(saree.price).toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}