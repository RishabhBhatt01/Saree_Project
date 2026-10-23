import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  getAddresses,
  submitAddress,
  createOrder,
  verifyPayment,
  cancelPayment,
} from "../api/client";
import PageHeader from "../components/PageHeader";
import { inputClass, primaryBtn } from "../components/AuthLayout";

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function Checkout() {
  const { items, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAddress);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [savingAddress, setSavingAddress] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + (item.sareeId?.price || 0) * item.quantity,
    0
  );

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

  const handlePayment = async () => {
    if (!selectedId) {
      setError("Please select or add a shipping address.");
      return;
    }
    setError("");
    setPlacingOrder(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Couldn't load the payment window. Check your connection.");
      setPlacingOrder(false);
      return;
    }

    let data;
    try {
      const res = await createOrder(selectedId);
      data = res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't start payment.");
      setPlacingOrder(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: "Thread Sutra",
      description: "Handloom saree order",
      prefill: { name: user?.username, email: user?.email },
      theme: { color: "#A8552F" },
      handler: async (response) => {
        try {
          const res = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          navigate("/order-confirmation", { state: { order: res.data.order } });
          refreshCart(true);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Payment received but couldn't be confirmed. Please contact us."
          );
          setPlacingOrder(false);
        }
      },
      modal: {
        ondismiss: async () => {
          // Closed without paying: release the reserved stock
          try {
            await cancelPayment(data.order._id);
          } catch {
            /* ignore */
          }
          setError("Payment cancelled. Your cart is safe.");
          setPlacingOrder(false);
        },
      },
    });
    rzp.open();
  };

  if (items.length === 0) {
    return (
      <div className="bg-weave px-6 py-20 text-center">
        <p className="mb-4 font-body text-ink/60">Your cart is empty.</p>
        <Link
          to="/"
          className="rounded-full bg-teal px-6 py-2.5 font-body text-sm text-ivory hover:bg-teal-dark"
        >
          Browse sarees
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <PageHeader
          eyebrow="Almost there"
          title="Checkout"
          subtitle="Choose where to send your order, then pay securely."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Address */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-display text-xl">Shipping address</h2>

            {loadingAddresses && (
              <p className="font-body text-sm text-ink/50">Loading addresses…</p>
            )}

            {!loadingAddresses && addresses.length > 0 && (
              <div className="mb-4 space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block cursor-pointer rounded-2xl border p-4 font-body text-sm transition ${
                      selectedId === addr._id
                        ? "border-clay bg-clay/5 shadow-sm"
                        : "border-dashed border-clay/40 bg-ivory hover:border-clay"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr._id}
                      checked={selectedId === addr._id}
                      onChange={() => setSelectedId(addr._id)}
                      className="mr-2 accent-clay"
                    />
                    <span className="font-medium">{addr.fullName}</span> ·{" "}
                    {addr.phone}
                    <br />
                    <span className="ml-5 text-ink/60">
                      {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="font-body text-sm text-clay hover:underline"
              >
                + Add a new address
              </button>
            )}

            {showForm && (
              <form
                onSubmit={handleSaveAddress}
                className="mt-4 space-y-4 rounded-2xl border border-dashed border-clay/40 bg-ivory p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="fullName"
                    required
                    placeholder="Full name"
                    value={form.fullName}
                    onChange={handleFormChange}
                    className={`${inputClass} col-span-2`}
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    className={`${inputClass} col-span-2`}
                  />
                  <input
                    name="addressLine"
                    required
                    placeholder="Address line"
                    value={form.addressLine}
                    onChange={handleFormChange}
                    className={`${inputClass} col-span-2`}
                  />
                  <input
                    name="city"
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                  <input
                    name="state"
                    required
                    placeholder="State"
                    value={form.state}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                  <input
                    name="pincode"
                    type="text"
                    required
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleFormChange}
                    className={`${inputClass} col-span-2`}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={savingAddress}
                    className="rounded-full bg-teal px-6 py-2 font-body text-sm text-ivory hover:bg-teal-dark disabled:opacity-50"
                  >
                    {savingAddress ? "Saving…" : "Save address"}
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="font-body text-sm text-ink/60 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-dashed border-clay/40 bg-linen p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl">Order summary</h2>
            <div className="mt-4 space-y-2">
              {items.map((item) => {
                const saree = item.sareeId;
                if (!saree) return null;
                return (
                  <div
                    key={saree._id}
                    className="flex justify-between gap-3 font-body text-sm text-ink/70"
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
            <div className="mt-4 flex items-center justify-between border-t border-clay/20 pt-4">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl tabular-nums text-clay">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {error && (
              <p className="mt-4 font-body text-sm text-oxblood" role="alert">
                {error}
              </p>
            )}

            <button
              onClick={handlePayment}
              disabled={placingOrder || !selectedId}
              className={`${primaryBtn} mt-5`}
            >
              {placingOrder
                ? "Processing…"
                : `Pay ₹${total.toLocaleString("en-IN")}`}
            </button>
            <p className="mt-3 text-center font-body text-[11px] text-ink/50">
              Secure payment by Razorpay
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}