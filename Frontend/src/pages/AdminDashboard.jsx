import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminDashboardData } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

function StatCard({ label, value }) {
  return (
    <div className="border border-ink/10 px-5 py-4">
      <p className="font-body text-xs uppercase tracking-wide text-ink/50 mb-1">
        {label}
      </p>
      <p className="font-display text-2xl tabular-nums">{value}</p>
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
    return <p className="text-center py-20 text-ink/50 font-body">Loading dashboard…</p>;
  }

  if (error || !data) {
    return <p className="text-center py-20 text-oxblood font-body">{error}</p>;
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
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl">Admin dashboard</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/orders"
            className="border border-oxblood text-oxblood px-4 py-2 text-sm font-body hover:bg-oxblood/5 transition-colors"
          >
            View all orders
          </Link>
          <Link
            to="/admin/add-saree"
            className="bg-oxblood text-ivory px-4 py-2 text-sm font-body hover:bg-oxblood-dark transition-colors"
          >
            + Add saree
          </Link>
        </div>
      </div>
      <p className="text-ink/60 font-body text-sm mb-6">
        Store overview for Thread Sutra.
      </p>
      <ThreadDivider variant="oxblood" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <StatCard label="Total users" value={totalUsers} />
        <StatCard label="Total orders" value={totalOrders} />
        <StatCard
          label="Today's sales"
          value={`₹${Number(orderDaily).toLocaleString("en-IN")}`}
        />
        <StatCard
          label="This month's sales"
          value={`₹${Number(orderMonthly).toLocaleString("en-IN")}`}
        />
      </div>

      {/* Stock alerts */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-xl mb-4 text-gold-light">
            Low stock <span className="text-ink/40 text-sm">(&le; 100 units)</span>
          </h2>
          {lowStockSarees.length === 0 ? (
            <p className="text-ink/50 font-body text-sm">Nothing running low.</p>
          ) : (
            <ul className="space-y-2">
              {lowStockSarees.map((s) => (
                <li
                  key={s._id}
                  className="flex justify-between font-body text-sm border-b border-ink/10 pb-2"
                >
                  <span>{s.name}</span>
                  <span className="tabular-nums text-gold">{s.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl mb-4 text-oxblood">
            Out of stock
          </h2>
          {outOfStockSarees.length === 0 ? (
            <p className="text-ink/50 font-body text-sm">Nothing out of stock.</p>
          ) : (
            <ul className="space-y-2">
              {outOfStockSarees.map((s) => (
                <li
                  key={s._id}
                  className="flex justify-between font-body text-sm border-b border-ink/10 pb-2"
                >
                  <span>{s.name}</span>
                  <span className="tabular-nums text-oxblood">0 left</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
