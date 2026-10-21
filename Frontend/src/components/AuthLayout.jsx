import { Link } from "react-router-dom";

// Paste your 3 saree image links here
const IMAGES = [
  "https://images.unsplash.com/photo-1610189013429-a703f4b245cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
];

export const inputClass =
  "w-full rounded-full border border-clay/30 bg-ivory px-5 py-2.5 font-body text-sm outline-none transition focus:border-clay focus:ring-2 focus:ring-clay/20";

export const primaryBtn =
  "w-full rounded-full bg-teal py-3 font-body text-ivory transition-colors hover:bg-teal-dark disabled:opacity-50";

function Arch({ src, className }) {
  return (
    <div
      className={`rounded-t-full border border-dashed border-ivory/80 bg-ivory/10 p-2 shadow-xl ${className}`}
    >
      <div className="h-full w-full overflow-hidden rounded-t-full bg-sand">
        <img
          src={src}
          alt="Handloom saree"
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-[calc(100vh-70px)] md:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative flex flex-col justify-between overflow-hidden bg-clay bg-weave px-8 py-8 text-ivory md:px-12 md:py-10">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-ivory/20" />
        <div className="pointer-events-none absolute -left-20 bottom-24 h-64 w-64 rounded-full bg-turmeric/20" />

        <Link to="/" className="relative z-10 font-display text-xl">
          Thread <span className="italic text-turmeric">Sutra</span>
        </Link>

        {/* Large arches (desktop) */}
        <div className="relative z-10 hidden items-end justify-center gap-5 py-6 md:flex">
          <Arch src={IMAGES[0]} className="h-[36vh] w-[26%]" />
          <Arch src={IMAGES[1]} className="h-[50vh] w-[34%]" />
          <Arch src={IMAGES[2]} className="h-[40vh] w-[26%]" />
        </div>

        <div className="relative z-10 text-center md:text-left">
          <h2 className="font-display text-2xl leading-snug md:text-4xl">
            Woven by hand,
            <br />
            <span className="italic text-turmeric">worn with story.</span>
          </h2>
          <p className="mt-3 hidden font-body text-sm text-ivory/85 md:block">
            Handloom sarees, chosen thread by thread.
          </p>
          <div className="mt-5 hidden gap-2 md:flex">
            {["Handloom", "Small batch", "Curated"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ivory/50 px-3 py-1 font-body text-[10px] uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-linen bg-weave px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-dashed border-clay/40 bg-ivory p-8 shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
}