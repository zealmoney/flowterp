export default function RecommendationBoostNotice({ reasons = [], compact = false }) {
  if (!Array.isArray(reasons) || reasons.length === 0) return null;

  if (compact) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {reasons.slice(0, 1).map((reason) => (
          <span
            key={reason}
            className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
          >
            {reason}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
        Why this is recommended
      </p>

      <div className="flex flex-wrap gap-2">
        {reasons.map((reason) => (
          <span
            key={reason}
            className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200"
          >
            {reason}
          </span>
        ))}
      </div>
    </div>
  );
}