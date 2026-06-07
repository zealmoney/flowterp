export default function CopilotActionButton({ action, onAction }) {
  return (
    <button
      type="button"
      onClick={() => onAction(action)}
      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-violet-400/30 hover:bg-violet-500/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{action.label}</p>
          <p className="mt-1 text-xs leading-5 text-zinc-400">
            {action.description}
          </p>
        </div>

        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[11px] font-medium text-violet-200">
          Apply
        </span>
      </div>
    </button>
  );
}