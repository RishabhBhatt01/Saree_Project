import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-[#faf6f1] py-16 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <p className="text-sm tracking-[0.3em] text-[#9b3d5c]">
            SAARÉE
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#332525]">
            My Wishlist
          </h1>

        </div>

        {wishlist.length === 0 ? (

          <div className="text-center py-20">

            <div className="text-6xl">
              ♡
            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#332525]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-3 text-gray-600">
              Save your favourite sarees here.
            </p>

            <Link
              to="/shop"
              className="inline-block mt-8 bg-[#9b3d5c] text-white px-8 py-3 rounded-full"
            >
              SHOP SAREES
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default Wishlist;