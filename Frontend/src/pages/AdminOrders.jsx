import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAdminOrders } from "../api/client";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

const pageBtn =
  "rounded-full border border-clay/40 px-5 py-2 font-body text-sm transition hover:border-clay hover:bg-clay/10 disabled:opacity-30 disabled:hover:bg-transparent";

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
    <div className="bg-weave">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <PageHeader
          eyebrow="Admin"
          title="All orders"
          subtitle="Every order placed on Thread Sutra, newest first."
        />

        {loading && (
          <p className="font-body text-sm text-ink/50">Loading orders…</p>
        )}
        {error && <p className="font-body text-sm text-oxblood">{error}</p>}

        {!loading && data && (
          <>
            <div className="space-y-3">
              {data.orders.length === 0 ? (
                <p className="font-body text-sm text-ink/50">No orders found.</p>
              ) : (
                data.orders.map((order) => (
                  <button
                    key={order._id}
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-clay/40 bg-ivory px-5 py-4 text-left font-body text-sm transition hover:-translate-y-0.5 hover:border-clay hover:shadow-md"
                  >
                    <span className="font-display text-base">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-ink/70">
                      {order.shippingAddress?.fullName}
                    </span>
                    <span className="tabular-nums text-clay">
                      ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                    </span>
                    <StatusBadge status={order.status} />
                  </button>
                ))
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={!data.hasPreviousPage}
                className={pageBtn}
              >
                ← Previous
              </button>
              <span className="font-body text-sm text-ink/60">
                Page {data.currentPage} of {data.totalPages || 1} (
                {data.totalOrders} orders)
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={!data.hasNextPage}
                className={pageBtn}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}