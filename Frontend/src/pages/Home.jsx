import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSarees } from "../api/client";
import ProductCard from "../components/ProductCard";
import ThreadDivider from "../components/ThreadDivider";

const trust = [
  {
    title: "Handloom",
    text: "Woven by skilled artisans",
    icon: <path d="M4 6h16M4 12h16M4 18h16M8 4v16M16 4v16" />,
  },
  {
    title: "Secure payment",
    text: "Paid safely through Razorpay",
    icon: (
      <>
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: "Carefully packed",
    text: "Wrapped to arrive fresh",
    icon: (
      <>
        <path d="M3 8l9-5 9 5v8l-9 5-9-5V8z" />
        <path d="M3 8l9 5 9-5M12 13v8" />
      </>
    ),
  },
];

const sorts = [
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

// 1 … 4 5 6 … 20 style page list
function pageList(current, total) {
  const set = new Set([1, total, current - 1, current, current + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push(`gap-${n}`);
    out.push(n);
  });
  return out;
}

// Animation styles live here so no other file needs editing
const animationCss = `
@keyframes ts-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ts-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes ts-glow {
  0%   { box-shadow: 0 0 0 0 rgba(168,85,47,.45); }
  70%  { box-shadow: 0 0 0 14px rgba(168,85,47,0); }
  100% { box-shadow: 0 0 0 0 rgba(168,85,47,0); }
}
.ts-up    { opacity: 0; animation: ts-fade-up .8s cubic-bezier(.2,.7,.2,1) forwards; }
.ts-float { animation: ts-float 6s ease-in-out infinite; }
.ts-float-slow { animation: ts-float 8s ease-in-out infinite; }
.ts-glow  { animation: ts-glow 2.6s ease-out infinite; }
.ts-reveal { opacity: 0; transform: translateY(28px);
  transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1); }
.ts-reveal.ts-in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .ts-up, .ts-float, .ts-float-slow, .ts-glow { animation: none !important; opacity: 1; }
  .ts-reveal { opacity: 1; transform: none; transition: none; }
}
`;

// Fades a block in when it scrolls into view
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`ts-reveal ${shown ? "ts-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const fabric = searchParams.get("fabric") || "";
  const category = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "new";

  const [sarees, setSarees] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ totalPages: 1, totalSarees: 0 });
  const [hero, setHero] = useState(null);
  const [spotlight, setSpotlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getSarees({
      page,
      ...(fabric && { fabric }),
      ...(category && { category }),
      ...(q && { q }),
      ...(sort !== "new" && { sort }),
    })
      .then((res) => {
        const d = res.data;
        const list = d.saree || [];
        setSarees(list);
        setFabrics(d.fabrics || []);
        setCategories(d.categories || []);
        setMeta({ totalPages: d.totalPages || 1, totalSarees: d.totalSarees || 0 });
        // hero saree and spotlight arches are set once, from the first load
        setHero((prev) => prev || list.find((s) => s.sareeImg) || null);
        setSpotlight((prev) =>
          prev.length ? prev : list.filter((s) => s.sareeImg).slice(0, 3)
        );
      })
      .catch(() => setError("Couldn't load sarees. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [page, fabric, category, q, sort]);

  // A search or occasion pick jumps to the results
  useEffect(() => {
    if (q || category) {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [q, category]);

  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  const buildParams = (overrides) => {
    const next = { fabric, category, q, sort, page, ...overrides };
    const out = {};
    if (next.fabric) out.fabric = next.fabric;
    if (next.category) out.category = next.category;
    if (next.q) out.q = next.q;
    if (next.sort && next.sort !== "new") out.sort = next.sort;
    out.page = next.page;
    return out;
  };

  const goToPage = (p) => {
    setSearchParams(buildParams({ page: p }));
    scrollToShop();
  };
  const pickFabric = (f) => setSearchParams(buildParams({ fabric: f, page: 1 }));
  const pickCategory = (c) =>
    setSearchParams(buildParams({ category: c === category ? "" : c, page: 1 }));
  const pickSort = (s) => setSearchParams(buildParams({ sort: s, page: 1 }));
  const clearAll = () => setSearchParams({ page: 1 });

  const pageBtn =
    "min-w-[2.5rem] rounded-full border px-3 py-2 font-body text-sm transition disabled:opacity-30";

  const filtering = Boolean(q || fabric || category);

  return (
    <div className="bg-weave">
      <style>{animationCss}</style>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 md:grid-cols-2">
        <div>
          <p
            className="ts-up font-body text-xs uppercase tracking-[0.3em] text-clay"
            style={{ animationDelay: "0ms" }}
          >
            Handloom · Small batch
          </p>
          <h1
            className="ts-up mt-3 font-display text-5xl leading-[1.05] md:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Woven by hand,
            <br />
            <span className="italic text-clay">worn with story.</span>
          </h1>
          <p
            className="ts-up mt-5 max-w-md font-body text-ink/60"
            style={{ animationDelay: "240ms" }}
          >
            A curated edit of fabrics and weaves, where each saree carries the
            patience of the loom it came from.
          </p>

          <div
            className="ts-up mt-8 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#shop"
              className="ts-glow group inline-flex items-center gap-3 rounded-full bg-clay py-2 pl-7 pr-2 font-body text-sm font-medium text-ivory transition-colors duration-300 hover:bg-oxblood"
            >
              Shop now
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-clay transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
            <a
              href="#occasions"
              className="font-body text-sm text-clay underline underline-offset-4 hover:text-oxblood"
            >
              Shop by occasion
            </a>
          </div>
        </div>

        <div
          className="ts-up relative mx-auto w-full max-w-sm"
          style={{ animationDelay: "250ms" }}
        >
          <div className="ts-float">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-t-full bg-turmeric/25" />
            <div className="relative rounded-t-full border border-dashed border-clay/60 bg-ivory p-3 shadow-lg">
              <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-sand">
                {hero?.sareeImg && (
                  <img
                    src={hero.sareeImg}
                    alt={hero.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-dashed border-clay/30 bg-linen">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-5 sm:grid-cols-3">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 120}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-clay/60 text-clay">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {t.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm">{t.title}</p>
                  <p className="font-body text-xs text-ink/60">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Artisan spotlight */}
      <section className="overflow-hidden bg-oxblood text-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 md:grid-cols-2">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">
              The loom
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
              Handcrafted, <span className="italic text-gold">thread by thread.</span>
            </h2>
            <p className="mt-4 max-w-md font-body text-sm text-ivory/80">
              Every saree here is chosen by one seller for how it feels, drapes
              and ages. No warehouse shelves, just a small, personal edit.
            </p>
            <a
              href="#shop"
              className="mt-6 inline-block rounded-full bg-gold px-7 py-2.5 font-body text-sm text-ink transition hover:-translate-y-0.5 hover:bg-turmeric"
            >
              Explore the collection
            </a>
          </Reveal>
          <div className="flex justify-center gap-4">
            {spotlight.map((s, i) => (
              <div key={s._id} className={i === 1 ? "mt-8" : ""}>
                <div
                  className="ts-float-slow aspect-[3/5] w-24 overflow-hidden rounded-t-full border border-dashed border-gold/60 p-1 sm:w-32"
                  style={{ animationDelay: `${i * 0.9}s` }}
                >
                  <img
                    src={s.sareeImg}
                    alt={s.name}
                    className="h-full w-full rounded-t-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-14">
        <Reveal className="mb-8 text-center">
          <h2 className="font-display text-3xl">
            {q ? "Search results" : category ? category : "Curated collection"}
          </h2>

          {/* Sort tabs */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {sorts.map((s) => (
              <button
                key={s.key}
                onClick={() => pickSort(s.key)}
                className={`rounded-full border px-4 py-1.5 font-body text-xs transition-colors ${
                  sort === s.key
                    ? "border-teal bg-teal text-ivory"
                    : "border-clay/40 text-ink/70 hover:border-clay"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Fabric chips */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {["", ...fabrics].map((f) => (
              <button
                key={f || "all"}
                onClick={() => pickFabric(f)}
                className={`rounded-full border px-4 py-1.5 font-body text-xs uppercase tracking-widest transition-colors ${
                  fabric === f
                    ? "border-clay bg-clay text-ivory"
                    : "border-clay/40 text-ink/70 hover:border-clay"
                }`}
              >
                {f || "All"}
              </button>
            ))}
          </div>

          {!loading && !error && meta.totalSarees > 0 && (
            <p className="mt-3 font-body text-xs text-ink/50">
              {meta.totalSarees} saree{meta.totalSarees !== 1 ? "s" : ""}
              {q && <> for “{q}”</>}
              {filtering && (
                <>
                  {" · "}
                  <button
                    onClick={clearAll}
                    className="text-clay underline hover:text-oxblood"
                  >
                    Clear
                  </button>
                </>
              )}
            </p>
          )}
        </Reveal>

        {loading && (
          <p className="text-center font-body text-sm text-ink/50">Loading sarees…</p>
        )}
        {error && (
          <p className="text-center font-body text-sm text-oxblood">{error}</p>
        )}

        {!loading && !error && sarees.length === 0 && (
          <div className="mx-auto max-w-sm rounded-2xl border border-dashed border-clay/40 bg-ivory p-8 text-center">
            <p className="font-display text-xl">
              {filtering ? "No sarees match your search" : "No sarees yet"}
            </p>
            <p className="mt-2 font-body text-sm text-ink/60">
              {filtering
                ? "Try a different word, or clear the filters."
                : "Check back soon."}
            </p>
            {filtering && (
              <button
                onClick={clearAll}
                className="mt-4 rounded-full bg-teal px-6 py-2 font-body text-sm text-ivory hover:bg-teal-dark"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {sarees.map((saree, i) => (
              <div
                key={saree._id}
                className="ts-up"
                style={{ animationDelay: `${Math.min(i, 11) * 70}ms` }}
              >
                <ProductCard saree={saree} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && meta.totalPages > 1 && (
          <nav
            className="mt-14 flex flex-wrap items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className={`${pageBtn} border-clay/40 hover:border-clay hover:bg-clay/10`}
            >
              ← Prev
            </button>

            {pageList(page, meta.totalPages).map((n) =>
              typeof n === "string" ? (
                <span key={n} className="px-1 font-body text-ink/40">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  aria-current={n === page ? "page" : undefined}
                  className={`${pageBtn} ${
                    n === page
                      ? "border-clay bg-clay text-ivory"
                      : "border-clay/40 hover:border-clay hover:bg-clay/10"
                  }`}
                >
                  {n}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= meta.totalPages}
              className={`${pageBtn} border-clay/40 hover:border-clay hover:bg-clay/10`}
            >
              Next →
            </button>
          </nav>
        )}
      </section>

      {/* Shop by occasion */}
      {categories.length > 0 && (
        <section
          id="occasions"
          className="relative scroll-mt-28 overflow-hidden bg-linen"
        >
          <ThreadDivider variant="gold" />
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-turmeric/10" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full border border-dashed border-clay/30" />

          <div className="relative mx-auto max-w-6xl px-6 py-16">
            <Reveal className="mb-12 text-center">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-clay">
                Find your moment
              </p>
              <h2 className="mt-2 font-display text-4xl">
                Shop by <span className="italic text-clay">occasion</span>
              </h2>
              <p className="mt-3 font-body text-sm text-ink/55">
                Pick an occasion to see sarees chosen for it.
                {category && " Tap it again to clear."}
              </p>
            </Reveal>

            <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-12">
              {categories.map((c, i) => {
                const active = c.name === category;
                return (
                  <Reveal
                    key={c.name}
                    delay={i * 90}
                    className={`w-40 sm:w-48 ${i % 2 === 1 ? "md:mt-12" : ""}`}
                  >
                    <button
                      onClick={() => pickCategory(c.name)}
                      aria-pressed={active}
                      className="group relative block w-full text-left"
                    >
                      {/* offset backing arch */}
                      <span
                        aria-hidden="true"
                        className={`absolute -right-2.5 -top-2.5 h-full w-full rounded-t-full transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                          active ? "bg-clay/30" : "bg-turmeric/30"
                        }`}
                      />

                      <span
                        className={`relative block aspect-[3/4] overflow-hidden rounded-t-full bg-ivory p-1.5 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl ${
                          active
                            ? "border-2 border-clay shadow-lg"
                            : "border border-dashed border-clay/60 group-hover:border-clay"
                        }`}
                      >
                        <span className="relative block h-full w-full overflow-hidden rounded-t-full bg-sand">
                          {c.image && (
                            <img
                              src={c.image}
                              alt={c.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                          )}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
                          />

                          <span className="absolute left-1/2 top-5 -translate-x-1/2 font-display text-xs tracking-widest text-ivory/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          <span className="absolute inset-x-0 bottom-0 px-2 pb-4 text-center">
                            <span className="block font-display text-xl leading-tight text-ivory">
                              {c.name}
                            </span>
                            <span className="mx-auto mt-2 block h-px w-8 bg-gold/80 transition-all duration-300 group-hover:w-14" />
                            <span className="mt-2 block font-body text-[10px] uppercase tracking-widest text-gold">
                              {active
                                ? "Showing now"
                                : `${c.count} saree${c.count !== 1 ? "s" : ""}`}
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Closing promo */}
      <section className="bg-ivory">
        <ThreadDivider variant="gold" />
        <Reveal className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h2 className="font-display text-2xl">
            One seller. <span className="italic text-clay">One careful edit.</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-ink/60">
            Found something you love? Add it to your bag and we'll pack it with
            care.
          </p>
          <a
            href="#shop"
            className="mt-5 inline-block rounded-full bg-teal px-8 py-2.5 font-body text-sm text-ivory transition hover:-translate-y-0.5 hover:bg-teal-dark"
          >
            Back to the collection
          </a>
        </Reveal>
      </section>
    </div>
  );
}