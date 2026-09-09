import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getAddresses, submitAddress, createOrder } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const { items, refreshCart } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddress);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce((sum, item) => {
    const price = item.sareeId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const loadAddresses = () => {
    setLoadingAddresses(true);
    getAddresses()
      .then((res) => {
        const list = res.data.addresses || [];
        setAddresses(list);
        if (list.length > 0) setSelectedId(list[0]._id);
        else setShowForm(true);
      })
      .catch(() => setError("Couldn't load addresses."))
      .finally(() => setLoadingAddresses(false));
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setError("");
    setSavingAddress(true);
    try {
      const res = await submitAddress(form);
      const newAddress = res.data.address;
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedId(newAddress._id);
      setShowForm(false);
      setForm(emptyAddress);
    } catch {
      setError("Couldn't save address. Please check the details.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedId) {
      setError("Please select or add a shipping address.");
      return;
    }
    setError("");
    setPlacingOrder(true);
    try {
      const res = await createOrder(selectedId);
      await refreshCart(); // cart is cleared server-side on order placement
      navigate("/order-confirmation", { state: { order: res.data.order } });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-ink/60 font-body mb-4">Your cart is empty.</p>
        <Link to="/" className="text-oxblood font-body hover:underline">
          Browse sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">Checkout</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Choose where to send your order.
      </p>
      <ThreadDivider variant="teal" />

      {/* Address selection */}
      <div className="mt-8">
        <h2 className="font-display text-xl mb-4">Shipping address</h2>

        {loadingAddresses && (
          <p className="text-ink/50 font-body text-sm">Loading addresses…</p>
        )}

        {!loadingAddresses && addresses.length > 0 && (
          <div className="space-y-3 mb-4">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`block border px-4 py-3 cursor-pointer font-body text-sm ${
                  selectedId === addr._id
                    ? "border-oxblood bg-oxblood/5"
                    : "border-ink/20"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectedId === addr._id}
                  onChange={() => setSelectedId(addr._id)}
                  className="mr-2 accent-oxblood"
                />
                <span className="font-medium">{addr.fullName}</span> · {addr.phone}
                <br />
                <span className="text-ink/60 ml-5">
                  {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                </span>
              </label>
            ))}
          </div>
        )}

        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-oxblood font-body text-sm hover:underline"
          >
            + Add a new address
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSaveAddress} className="space-y-4 mt-4 border border-ink/10 p-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="fullName"
                required
                placeholder="Full name"
                value={form.fullName}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none col-span-2"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone"
                value={form.phone}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none col-span-2"
              />
              <input
                name="addressLine"
                required
                placeholder="Address line"
                value={form.addressLine}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none col-span-2"
              />
              <input
                name="city"
                required
                placeholder="City"
                value={form.city}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none"
              />
              <input
                name="state"
                required
                placeholder="State"
                value={form.state}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none"
              />
              <input
                name="pincode"
                type="text"
                required
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleFormChange}
                className="border border-ink/20 bg-transparent px-3 py-2 font-body text-sm focus:border-oxblood outline-none col-span-2"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={savingAddress}
                className="bg-oxblood text-ivory px-5 py-2 font-body text-sm hover:bg-oxblood-dark disabled:opacity-50"
              >
                {savingAddress ? "Saving…" : "Save address"}
              </button>
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-ink/60 font-body text-sm hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Order summary */}
      <div className="mt-10">
        <h2 className="font-display text-xl mb-4">Order summary</h2>
        <div className="space-y-2">
          {items.map((item) => {
            const saree = item.sareeId;
            if (!saree) return null;
            return (
              <div
                key={saree._id}
                className="flex justify-between font-body text-sm text-ink/70"
              >
                <span>
                  {saree.name} × {item.quantity}
                </span>
                <span className="tabular-nums">
                  ₹{(saree.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-ink/10">
          <span className="font-display text-xl">Total</span>
          <span className="font-display text-xl tabular-nums">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {error && (
        <p className="text-oxblood text-sm font-body mt-4" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder || !selectedId}
        className="w-full bg-oxblood text-ivory py-3 font-body hover:bg-oxblood-dark transition-colors disabled:opacity-50 mt-6"
      >
        {placingOrder ? "Placing order…" : "Place order"}
      </button>
    </div>
  );
}
