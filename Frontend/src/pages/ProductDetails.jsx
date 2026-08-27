import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
  } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#faf6f1] flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="font-serif text-4xl text-[#332525]">
            Product Not Found
          </h1>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-[#9b3d5c] text-white px-8 py-3 rounded-full"
          >
            BACK TO SHOP
          </Link>

        </div>
      </main>
    );
  }

  const wishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (wishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  return (
    <main className="bg-[#faf6f1] min-h-screen py-16 px-6">

      <div className="max-w-7xl mx-auto">

        {/* BREADCRUMB */}

        <div className="mb-8 text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-[#9b3d5c]"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/shop"
            className="hover:text-[#9b3d5c]"
          >
            Shop
          </Link>

          <span className="mx-2">/</span>

          <span className="line-clamp-1">
            {product.name}
          </span>

        </div>


        {/* PRODUCT */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-10">

          {/* IMAGE */}

          <div className="relative">

            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              className="w-full h-[550px] md:h-[650px] object-cover rounded-2xl"
            />

            {product.badge && (
              <span className="absolute top-5 left-5 bg-[#9b3d5c] text-white text-xs tracking-wider px-4 py-2 rounded-full">
                {product.badge}
              </span>
            )}

          </div>


          {/* DETAILS */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            <p className="text-sm tracking-[0.3em] uppercase text-[#9b3d5c]">
              {product.category}
            </p>


            {/* NAME */}

            <h1 className="mt-4 font-serif text-4xl md:text-5xl text-[#332525]">
              {product.name}
            </h1>


            {/* PRICE */}

            <p className="mt-6 text-3xl font-semibold text-[#332525]">
              ₹{product.price.toLocaleString("en-IN")}
            </p>


            <div className="my-8 h-px bg-gray-200" />


            {/* DESCRIPTION */}

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>


            {/* LENGTH */}

            {(product.sareeLength || product.blouseLength) && (
              <div className="mt-6 bg-[#faf6f1] rounded-2xl p-5">

                <h3 className="font-medium text-[#332525] mb-3">
                  Product Details
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  {product.sareeLength && (
                    <div>
                      <p className="text-gray-500">
                        Saree Length
                      </p>

                      <p className="font-medium text-[#332525] mt-1">
                        {product.sareeLength}
                      </p>
                    </div>
                  )}

                  {product.blouseLength && (
                    <div>
                      <p className="text-gray-500">
                        Blouse Length
                      </p>

                      <p className="font-medium text-[#332525] mt-1">
                        {product.blouseLength}
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )}


            {/* QUANTITY */}

            <div className="mt-8">

              <p className="text-sm font-medium text-gray-700 mb-3">
                Quantity
              </p>

              <div className="flex items-center border border-gray-200 rounded-full w-fit">

                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="w-12 h-12 text-xl hover:text-[#9b3d5c]"
                >
                  −
                </button>

                <span className="w-10 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  className="w-12 h-12 text-xl hover:text-[#9b3d5c]"
                >
                  +
                </button>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="mt-8 flex gap-3">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#9b3d5c] text-white py-4 rounded-full font-medium tracking-wide hover:bg-[#7b2949] transition"
              >
                {added
                  ? "ADDED TO CART ✓"
                  : "ADD TO CART"}
              </button>

              <button
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-full border flex-shrink-0 flex items-center justify-center text-xl transition ${
                  wishlist
                    ? "bg-[#9b3d5c] text-white border-[#9b3d5c]"
                    : "bg-white text-[#9b3d5c] border-[#9b3d5c] hover:bg-[#f5e6ea]"
                }`}
              >
                {wishlist ? "♥" : "♡"}
              </button>

            </div>


            {/* VIEW CART */}

            {added && (
              <Link
                to="/cart"
                className="mt-3 w-full block text-center border border-[#9b3d5c] text-[#9b3d5c] py-4 rounded-full font-medium tracking-wide hover:bg-[#9b3d5c] hover:text-white transition"
              >
                VIEW CART
              </Link>
            )}


            {/* SHOPPING INFO */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="text-center p-4 bg-[#faf6f1] rounded-xl">
                <p className="font-medium text-[#332525]">
                  Premium
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Quality Fabric
                </p>
              </div>

              <div className="text-center p-4 bg-[#faf6f1] rounded-xl">
                <p className="font-medium text-[#332525]">
                  Secure
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Payments
                </p>
              </div>

              <div className="text-center p-4 bg-[#faf6f1] rounded-xl">
                <p className="font-medium text-[#332525]">
                  Easy
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Returns
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;