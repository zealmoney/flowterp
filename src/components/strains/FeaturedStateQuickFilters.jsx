export default function FeaturedStateQuickFilters({
  states = [],
  activeState,
  onSelectState,
}) {
  if (!states.length) return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
          Quick Start States
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {states.map((state) => {
          const isActive = activeState === state.slug;

          return (
            <button
              key={state.id}
              type="button"
              onClick={() => onSelectState(isActive ? "" : state.slug)}
              className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-violet-400/50 bg-violet-500/15 text-white shadow-lg shadow-violet-900/20"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/[0.07]"
              }`}
            >
              <div className="text-sm font-semibold">{state.name}</div>
              <div className="mt-1 max-w-[220px] text-xs leading-5 text-zinc-400">
                {state.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}