import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThreadDivider from "./ThreadDivider";

const linkClass = ({ isActive }) =>
  `pb-0.5 border-b-2 transition-colors hover:text-oxblood ${
    isActive ? "border-clay text-ink" : "border-transparent text-ink/70"
  }`;

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          Thread <span className="text-clay italic">Sutra</span>
        </Link>

        <div className="flex items-center gap-6 font-body text-sm">
          <NavLink to="/" end className={linkClass}>
            Shop
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          <NavLink to="/cart" className={linkClass}>
            <span className="relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-clay text-ivory text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </span>
          </NavLink>

          {user && (
            <NavLink to="/orders" className={linkClass}>
              My Orders
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-ink/60 hidden sm:inline">
                Hi, {user.username}
              </span>
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
              className="bg-teal text-ivory px-4 py-1.5 rounded-full hover:bg-teal-dark transition-colors"
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