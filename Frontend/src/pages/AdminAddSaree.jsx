import { useState } from "react";
import { createSaree } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

export default function AdminAddSaree() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    fabric: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please choose an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("sareeImg", file);

    setSubmitting(true);
    try {
      await createSaree(formData);
      setSuccess("Saree added successfully.");
      setForm({ name: "", price: "", fabric: "", category: "", description: "" });
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't add saree.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">Add a saree</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Admin only — this listing appears in the shop immediately.
      </p>
      <ThreadDivider variant="oxblood" />

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" encType="multipart/form-data">
        <div>
          <label className="block font-body text-sm mb-1.5">Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5">Price (₹)</label>
          <input
            name="price"
            type="number"
            min="0"
            required
            value={form.price}
            onChange={handleChange}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5">Fabric</label>
          <input
            name="fabric"
            required
            value={form.fabric}
            onChange={handleChange}
            placeholder="Silk, Cotton, Chiffon…"
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5">Category</label>
          <input
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            placeholder="Wedding, Casual, Festive…"
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border border-ink/20 bg-transparent px-4 py-2.5 font-body focus:border-oxblood outline-none"
          />
        </div>

        <div>
          <label className="block font-body text-sm mb-1.5">Image</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full font-body text-sm"
          />
        </div>

        {error && <p className="text-oxblood text-sm font-body">{error}</p>}
        {success && <p className="text-teal text-sm font-body">{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-oxblood text-ivory py-3 font-body hover:bg-oxblood-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add saree"}
        </button>
      </form>
    </div>
  );
}
