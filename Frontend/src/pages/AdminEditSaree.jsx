import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOneSaree, updateSaree } from "../api/client";
import PageHeader from "../components/PageHeader";
import { inputClass, primaryBtn } from "../components/AuthLayout";

const labelClass = "mb-1.5 block font-body text-sm";

export default function AdminEditSaree() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [currentImg, setCurrentImg] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getOneSaree(id)
      .then((res) => {
        const s = res.data.saree;
        setForm({
          name: s.name ?? "",
          price: s.price ?? "",
          stock: s.stock ?? "",
          fabric: s.fabric ?? "",
          category: s.category ?? "",
          description: s.description ?? "",
        });
        setCurrentImg(s.sareeImg || "");
      })
      .catch(() => setError("Couldn't load this saree."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append("sareeImg", file);

    setSubmitting(true);
    try {
      await updateSaree(id, formData);
      navigate(`/product/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Couldn't update saree."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) {
    return (
      <p className="py-20 text-center font-body text-ink/50">
        {error || "Loading…"}
      </p>
    );
  }

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-xl px-6 py-12">
        <PageHeader
          eyebrow="Admin only"
          title="Edit saree"
          subtitle="Changes appear in the shop immediately."
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
            {currentImg && (
              <div className="mb-3 h-28 w-20 overflow-hidden rounded-t-full border border-clay/30 bg-sand">
                <img
                  src={currentImg}
                  alt="Current"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full font-body text-sm file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-clay file:px-4 file:py-2 file:text-sm file:text-ivory hover:file:bg-clay/90"
            />
            <p className="mt-1 font-body text-xs text-ink/50">
              Leave empty to keep the current image.
            </p>
          </div>

          {error && <p className="font-body text-sm text-oxblood">{error}</p>}

          <button type="submit" disabled={submitting} className={primaryBtn}>
            {submitting ? "Saving…" : "Save changes"}
          </button>
          <Link
            to={`/product/${id}`}
            className="block text-center font-body text-sm text-ink/60 hover:underline"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}