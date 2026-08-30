import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThreadDivider from "./ThreadDivider";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-2xl tracking-tight text-ink">
          Thread <span className="text-oxblood italic">Sutra</span>
        </Link>

        <div className="flex items-center gap-7 font-body text-sm">
          <Link to="/" className="hover:text-oxblood transition-colors">
            Shop
          </Link>

          {isAdmin && (
            <Link to="/admin" className="hover:text-oxblood transition-colors">
              Admin
            </Link>
          )}

          <Link
            to="/cart"
            className="relative hover:text-oxblood transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-oxblood text-ivory text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-ink/60">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="hover:text-oxblood transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-oxblood text-ivory px-4 py-2 rounded-sm hover:bg-oxblood-dark transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
      <ThreadDivider variant="gold" />
    </header>
  );
}
