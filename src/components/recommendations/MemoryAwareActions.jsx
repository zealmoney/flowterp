export default function MemoryAwareActions({ actions = [], onAction }) {
  if (!actions.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={() => onAction?.(action)}
          className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}