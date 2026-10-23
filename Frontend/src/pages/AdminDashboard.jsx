import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminDashboardData } from "../api/client";
import PageHeader from "../components/PageHeader";

function StatCard({ label, value, accent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-clay/40 bg-ivory">
      <div className={`h-1.5 ${accent}`} />
      <div className="px-5 py-4">
        <p className="mb-1 font-body text-xs uppercase tracking-widest text-ink/50">
          {label}
        </p>
        <p className="font-display text-3xl tabular-nums">{value}</p>
      </div>
    </div>
  );
}

function StockList({ title, hint, items, empty, tone }) {
  return (
    <div className="rounded-2xl border border-dashed border-clay/40 bg-ivory p-5">
      <h2 className={`mb-4 font-display text-xl ${tone}`}>
        {title} {hint && <span className="text-sm text-ink/40">{hint}</span>}
      </h2>
      {items.length === 0 ? (
        <p className="font-body text-sm text-ink/50">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((s) => (
            <li
              key={s._id}
              className="flex justify-between border-b border-clay/15 pb-2 font-body text-sm"
            >
              <span>{s.name}</span>
              <span className={`tabular-nums ${tone}`}>{s.stock} left</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminDashboardData()
      .then((res) => setData(res.data))
      .catch(() => setError("Couldn't load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="py-20 text-center font-body text-ink/50">
        Loading dashboard…
      </p>
    );
  }

  if (error || !data) {
    return (
      <p className="py-20 text-center font-body text-oxblood">{error}</p>
    );
  }

  const {
    totalUsers,
    totalOrders,
    lowStockSarees,
    outOfStockSarees,
    orderDaily,
    orderMonthly,
  } = data;

  return (
    <div className="bg-weave">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <PageHeader
          eyebrow="Store owner"
          title="Admin dashboard"
          subtitle="Store overview for Thread Sutra."
          action={
            <div className="flex gap-3">
              <Link
                to="/admin/orders"
                className="rounded-full border border-clay px-5 py-2 font-body text-sm text-clay transition hover:bg-clay/10"
              >
                View all orders
              </Link>
              <Link
                to="/admin/add-saree"
                className="rounded-full bg-teal px-5 py-2 font-body text-sm text-ivory transition hover:bg-teal-dark"
              >
                + Add saree
              </Link>
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total users" value={totalUsers} accent="bg-teal" />
          <StatCard label="Total orders" value={totalOrders} accent="bg-clay" />
          <StatCard
            label="Today's sales"
            value={`₹${Number(orderDaily).toLocaleString("en-IN")}`}
            accent="bg-turmeric"
          />
          <StatCard
            label="This month"
            value={`₹${Number(orderMonthly).toLocaleString("en-IN")}`}
            accent="bg-oxblood"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <StockList
            title="Low stock"
            hint="(≤ 100 units)"
            items={lowStockSarees}
            empty="Nothing running low."
            tone="text-clay"
          />
          <StockList
            title="Out of stock"
            items={outOfStockSarees}
            empty="Nothing out of stock."
            tone="text-oxblood"
          />
        </div>
      </div>
    </div>
  );
}