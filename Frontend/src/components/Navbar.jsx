import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="bg-[#fffaf5] border-b border-[#eadfd5] sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN NAVBAR */}

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="text-2xl md:text-3xl font-serif tracking-[0.1em] text-[#7b2949]"
          >
            Thread<span className="text-[#9b3d5c]">Sutra</span>
          </Link>


          {/* DESKTOP NAVIGATION */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 hover:text-[#9b3d5c] transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-gray-700 hover:text-[#9b3d5c] transition"
            >
              Shop
            </Link>

            <Link
              to="/collections"
              className="text-gray-700 hover:text-[#9b3d5c] transition"
            >
              Collections
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-[#9b3d5c] transition"
            >
              About
            </Link>

          </div>


          {/* RIGHT ICONS */}

          <div className="flex items-center gap-5">




            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className="hidden sm:block relative text-gray-700 hover:text-[#9b3d5c] transition"
            >

              <Heart size={21} />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9b3d5c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}

            </Link>


            {/* ACCOUNT */}

            <Link
              to="/login"
              className="hidden sm:block text-gray-700 hover:text-[#9b3d5c] transition"
            >
              <User size={21} />
            </Link>


            {/* CART */}

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-[#9b3d5c] transition"
            >

              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#9b3d5c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}

            </Link>


            {/* MOBILE MENU */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-gray-700"
            >
              {mobileMenu ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>

        </div>


        {/* SEARCH BAR */}
        <div>
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="pb-5"
            >
              ...
            </form>
          )}
        </div>



        {/* MOBILE MENU */}

        {mobileMenu && (
          <div className="md:hidden pb-6 border-t border-[#eadfd5]">

            <div className="flex flex-col gap-4 pt-5">

              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                Shop
              </Link>

              <Link
                to="/collections"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                Collections
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                About
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                Wishlist
              </Link>

              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="text-gray-700 hover:text-[#9b3d5c]"
              >
                Account
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;