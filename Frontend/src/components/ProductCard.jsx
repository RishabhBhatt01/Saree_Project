import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const wishlist = isInWishlist(product.id);

  return (
    <div className="group w-full min-w-0 bg-[#faf6f1] overflow-hidden border border-[#e7ddd5] hover:shadow-lg transition-all duration-300">
      {/* IMAGE */}

      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-[220px] sm:h-[360px] lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500"></div>

          {/* BADGE */}

          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#9b3d5c] text-white text-[10px] tracking-[0.15em] px-3 py-2">
              {product.badge}
            </span>
          )}

          {/* WISHLIST */}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (wishlist) {
                removeFromWishlist(product.id);
              } else {
                addToWishlist(product);
              }
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/95 flex items-center justify-center shadow-sm hover:bg-[#9b3d5c] hover:text-white transition-all duration-300"
          >
            <Heart
              size={19}
              className={
                wishlist ? "fill-[#9b3d5c] text-[#9b3d5c]" : "text-[#332525]"
              }
            />
          </button>
        </div>
      </Link>

      {/* PRODUCT INFO */}

      <div className="p-5 sm:p-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#9b3d5c]">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 font-serif text-xl text-[#332525] hover:text-[#9b3d5c] transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* EXTRA DETAILS */}

        {product.sareeLength && (
          <p className="mt-2 text-xs text-gray-500">
            Saree: {product.sareeLength} · Blouse: {product.blouseLength}
          </p>
        )}

        {/* DIVIDER */}

        <div className="mt-4 h-px bg-[#e7ddd5]"></div>

        {/* PRICE + CART */}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base sm:text-lg font-medium text-[#332525]">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2.5 border border-[#9b3d5c] text-[#9b3d5c] text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.1em] font-medium hover:bg-[#9b3d5c] hover:text-white transition-all duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
