function formatRelativeTime(dateString) {
  if (!dateString) return "Recently used";

  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function formatLabel(value) {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function RecentFlowCard({ flow, onOpen, onDelete }) {
  const chips = Object.entries(flow.filters_json || {})
    .filter(([key, value]) => {
      return (
        key !== "page" &&
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value !== false
      );
    })
    .slice(0, 4);

  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 hover:bg-violet-500/[0.04]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            Recent Flow
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
            {flow.name}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {formatRelativeTime(flow.last_used_at)}
          </p>
        </div>

        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-medium capitalize text-violet-200">
          {flow.source ? flow.source.replace("_", " ") : "flow"}
        </span>
      </div>

      {/* Chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {chips.length > 0 ? (
          chips.map(([key, value]) => (
            <span
              key={`${key}-${value}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-200"
            >
              {formatLabel(value)}
            </span>
          ))
        ) : (
          <span className="text-xs text-zinc-500">
            No filters applied
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => onOpen(flow)}
          className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400 active:scale-[0.98]"
        >
          Open flow
        </button>

        <button
          type="button"
          onClick={() => onDelete(flow.id)}
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200 active:scale-[0.98]"
        >
          Remove
        </button>
      </div>
    </div>
  );
}