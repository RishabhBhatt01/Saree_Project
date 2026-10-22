import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThreadDivider from "./ThreadDivider";

const linkClass = ({ isActive }) =>
  `pb-0.5 border-b-2 transition-colors hover:text-oxblood ${
    isActive ? "border-clay text-ink" : "border-transparent text-ink/70"
  }`;

const menuItem =
  "block w-full px-4 py-2 text-left font-body text-sm text-ink/80 hover:bg-clay/10 hover:text-clay";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const urlQ = searchParams.get("q") || "";
  const urlFabric = searchParams.get("fabric") || "";

  const [searchText, setSearchText] = useState(urlQ);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Keep the search box in sync with the URL (back button, clear)
  useEffect(() => {
    setSearchText(urlQ);
  }, [urlQ]);

  // Close the menu when clicking outside or pressing Escape
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    // keep the fabric filter only when already browsing the shop
    if (location.pathname === "/" && urlFabric) params.set("fabric", urlFabric);
    if (searchText.trim()) params.set("q", searchText.trim());
    params.set("page", "1");
    navigate(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          Thread <span className="text-clay italic">Sutra</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="order-last flex w-full items-center rounded-full border border-clay/40 bg-ivory pl-4 pr-1 transition focus-within:border-clay md:order-none md:w-72"
        >
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search sarees"
            maxLength={60}
            aria-label="Search sarees"
            className="min-w-0 flex-1 bg-transparent py-1.5 font-body text-sm outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-teal text-ivory transition-colors hover:bg-teal-dark"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
        </form>

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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex items-center gap-2 rounded-full border border-dashed border-clay/50 px-3 py-1 text-ink/80 transition hover:border-clay hover:text-clay"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay text-xs uppercase text-ivory">
                  {user.username?.[0] || "U"}
                </span>
                <span className="hidden sm:inline">Hi, {user.username}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-dashed border-clay/40 bg-ivory py-1 shadow-lg"
                >
                  <div className="border-b border-clay/20 px-4 py-2">
                    <p className="font-display text-sm text-ink">
                      {user.username}
                    </p>
                    <p className="truncate font-body text-xs text-ink/50">
                      {user.email}
                    </p>
                  </div>

                  {isAdmin ? (
                    <>
                      <Link to="/admin" onClick={() => setOpen(false)} className={menuItem}>
                        Dashboard
                      </Link>
                      <Link to="/admin/add-saree" onClick={() => setOpen(false)} className={menuItem}>
                        Add saree
                      </Link>
                      <Link to="/admin/orders" onClick={() => setOpen(false)} className={menuItem}>
                        All orders
                      </Link>
                    </>
                  ) : (
                    <Link to="/orders" onClick={() => setOpen(false)} className={menuItem}>
                      My orders
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className={`${menuItem} border-t border-clay/20 text-oxblood hover:text-oxblood`}
                  >
                    Log out
                  </button>
                </div>
              )}
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