import ThreadDivider from "./ThreadDivider";

export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="font-body text-xs uppercase tracking-[0.3em] text-clay">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1 font-display text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 font-body text-sm text-ink/60">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-5">
        <ThreadDivider variant="gold" />
      </div>
    </div>
  );
}