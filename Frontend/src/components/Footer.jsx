import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#332525] text-white">

      {/* Footer Main */}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 sm:gap-x-8 lg:gap-12">

          {/* Brand */}

          <div className="col-span-3 lg:col-span-1">

            <Link
              to="/"
              className="font-serif text-2xl sm:text-3xl tracking-[0.2em]"
            >
              SAARÉE
            </Link>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm">
              Timeless elegance, woven into every thread.
              Discover sarees crafted for moments that matter.
            </p>

            {/* Social */}

            <div className="flex flex-wrap gap-4 mt-4 sm:mt-6">

              <span className="text-xs sm:text-sm text-gray-300 hover:text-white cursor-pointer transition">
                Instagram
              </span>

              <span className="text-xs sm:text-sm text-gray-300 hover:text-white cursor-pointer transition">
                Facebook
              </span>

              <span className="text-xs sm:text-sm text-gray-300 hover:text-white cursor-pointer transition">
                Pinterest
              </span>

            </div>

          </div>


          {/* Shop */}

          <div>

            <h3 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6">
              Shop
            </h3>

            <div className="flex flex-col gap-2.5 sm:gap-4">

              <Link
                to="/shop"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                All Sarees
              </Link>

              <Link
                to="/shop?category=Silk%20Saree"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Silk Sarees
              </Link>

              <Link
                to="/shop?category=Banarasi"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Banarasi
              </Link>

              <Link
                to="/shop?category=Designer"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Designer Sarees
              </Link>

            </div>

          </div>


          {/* Help */}

          <div>

            <h3 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6">
              Help
            </h3>

            <div className="flex flex-col gap-2.5 sm:gap-4">

              <Link
                to="/contact"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Contact Us
              </Link>

              <Link
                to="/shipping"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Shipping
              </Link>

              <Link
                to="/returns"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Returns
              </Link>

              <Link
                to="/faq"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                FAQs
              </Link>

            </div>

          </div>


          {/* Account */}

          <div>

            <h3 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6">
              Account
            </h3>

            <div className="flex flex-col gap-2.5 sm:gap-4">

              <Link
                to="/login"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Register
              </Link>

              <Link
                to="/orders"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                My Orders
              </Link>

              <Link
                to="/wishlist"
                className="text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition"
              >
                Wishlist
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 sm:py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">

            <p className="text-center sm:text-left">
              © 2026 ThreadSutra. All rights reserved.
            </p>

            <div className="flex gap-4 sm:gap-6">

              <Link
                to="/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;