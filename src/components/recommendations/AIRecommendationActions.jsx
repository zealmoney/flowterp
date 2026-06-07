export default function AIRecommendationActions({ actions = [], onAction }) {
  if (!actions.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction?.(action)}
          className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/[0.1]"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}