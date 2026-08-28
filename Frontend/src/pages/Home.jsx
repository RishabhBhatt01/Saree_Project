import { useEffect, useState } from "react";
import { getSarees } from "../api/client";
import ProductCard from "../components/ProductCard";
import ThreadDivider from "../components/ThreadDivider";

export default function Home() {
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSarees()
      .then((res) => setSarees(res.data.saree || []))
      .catch(() => setError("Couldn't load sarees. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="font-display text-4xl md:text-5xl leading-tight max-w-xl">
          Handwoven sarees, chosen thread by thread.
        </h1>
        <p className="text-ink/60 font-body mt-3 max-w-md">
          A curated edit of fabrics and weaves — each saree carries its own story.
        </p>
      </section>
      <ThreadDivider variant="oxblood" />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {loading && (
          <p className="text-ink/50 font-body text-sm">Loading sarees…</p>
        )}
        {error && (
          <p className="text-oxblood font-body text-sm">{error}</p>
        )}
        {!loading && !error && sarees.length === 0 && (
          <p className="text-ink/50 font-body text-sm">
            No sarees available yet. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {sarees.map((saree) => (
            <ProductCard key={saree._id} saree={saree} />
          ))}
        </div>
      </section>
    </div>
  );
}
