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

const STATUS_COLORS = {
  Pending: "bg-gold/20 text-gold",
  Confirmed: "bg-teal/10 text-teal",
  Shipped: "bg-teal/10 text-teal",
  Delivered: "bg-oxblood/10 text-oxblood",
};

function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] || "bg-ink/10 text-ink/60";
  return (
    <span className={`px-2 py-0.5 text-xs font-body rounded-sm ${cls}`}>
      {status}
    </span>
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
    recentOrders,
    lowStockSarees,
    outOfStockSarees,
    orderDaily,
    orderMonthly,
  } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl">Admin dashboard</h1>
        <Link
          to="/admin/add-saree"
          className="bg-oxblood text-ivory px-4 py-2 text-sm font-body hover:bg-oxblood-dark transition-colors"
        >
          + Add saree
        </Link>
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

      {/* Recent orders */}
      <div className="mt-12">
        <h2 className="font-display text-xl mb-4">Recent orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-ink/50 font-body text-sm">No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between border border-ink/10 px-4 py-3 font-body text-sm"
              >
                <span className="text-ink/60">{order._id}</span>
                <span>{order.shippingAddress?.fullName}</span>
                <span className="tabular-nums">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </span>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        )}
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
