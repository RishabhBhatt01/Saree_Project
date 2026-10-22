const COLORS = {
  Pending: "bg-turmeric/25 text-clay",
  Confirmed: "bg-teal/10 text-teal",
  Shipped: "bg-teal text-ivory",
  Delivered: "bg-clay text-ivory",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-body text-[11px] uppercase tracking-wider ${
        COLORS[status] || "bg-ink/10 text-ink/60"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}