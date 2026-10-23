import { useState } from "react";
import { createSaree } from "../api/client";
import PageHeader from "../components/PageHeader";
import { inputClass, primaryBtn } from "../components/AuthLayout";

const labelClass = "mb-1.5 block font-body text-sm";

export default function AdminAddSaree() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
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
      setForm({
        name: "",
        price: "",
        stock: "",
        fabric: "",
        category: "",
        description: "",
      });
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't add saree.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-xl px-6 py-12">
        <PageHeader
          eyebrow="Admin only"
          title="Add a saree"
          subtitle="This listing appears in the shop immediately."
        />

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5 rounded-2xl border border-dashed border-clay/40 bg-ivory p-7"
        >
          <div>
            <label className={labelClass}>Name</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (₹)</label>
              <input
                name="price"
                type="number"
                min="0"
                required
                value={form.price}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Stock (units)</label>
              <input
                name="stock"
                type="number"
                min="0"
                required
                value={form.stock}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Fabric</label>
              <input
                name="fabric"
                required
                value={form.fabric}
                onChange={handleChange}
                placeholder="Silk, Cotton…"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                placeholder="Wedding, Casual…"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              className={`${inputClass} !rounded-2xl`}
            />
          </div>

          <div>
            <label className={labelClass}>Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full font-body text-sm file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-clay file:px-4 file:py-2 file:text-sm file:text-ivory hover:file:bg-clay/90"
            />
          </div>

          {error && <p className="font-body text-sm text-oxblood">{error}</p>}
          {success && <p className="font-body text-sm text-teal">{success}</p>}

          <button type="submit" disabled={submitting} className={primaryBtn}>
            {submitting ? "Adding…" : "Add saree"}
          </button>
        </form>
      </div>
    </div>
  );
}