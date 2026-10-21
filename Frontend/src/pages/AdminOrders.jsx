import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAdminOrders } from "../api/client";
import ThreadDivider from "../components/ThreadDivider";

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

export default function AdminOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getAdminOrders(page)
      .then((res) => setData(res.data))
      .catch(() => setError("Couldn't load orders."))
      .finally(() => setLoading(false));
  }, [page]);

  const goToPage = (p) => setSearchParams({ page: p });

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl mb-1">All orders</h1>
      <p className="text-ink/60 font-body text-sm mb-6">
        Every order placed on Thread Sutra, newest first.
      </p>
      <ThreadDivider variant="oxblood" />

      {loading && (
        <p className="text-ink/50 font-body text-sm mt-8">Loading orders…</p>
      )}
      {error && <p className="text-oxblood font-body text-sm mt-8">{error}</p>}

      {!loading && data && (
        <>
          <div className="mt-8 space-y-2">
            {data.orders.length === 0 ? (
              <p className="text-ink/50 font-body text-sm">No orders found.</p>
            ) : (
              data.orders.map((order) => (
                <button
                  key={order._id}
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                  className="w-full flex items-center justify-between border border-ink/10 px-4 py-3 font-body text-sm text-left hover:border-oxblood transition-colors"
                >
                  <span className="text-ink/60">{order._id}</span>
                  <span>{order.shippingAddress?.fullName}</span>
                  <span className="tabular-nums">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </span>
                  <StatusBadge status={order.status} />
                </button>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!data.hasPreviousPage}
              className="px-4 py-2 border border-ink/20 font-body text-sm hover:border-oxblood disabled:opacity-30 disabled:hover:border-ink/20"
            >
              ← Previous
            </button>
            <span className="font-body text-sm text-ink/60">
              Page {data.currentPage} of {data.totalPages || 1} ({data.totalOrders} orders)
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={!data.hasNextPage}
              className="px-4 py-2 border border-ink/20 font-body text-sm hover:border-oxblood disabled:opacity-30 disabled:hover:border-ink/20"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
