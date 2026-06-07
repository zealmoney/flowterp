import { getStateSuggestionBundle } from "../../data/stateSuggestions";

function SuggestionGroup({ label, items, onApply, activeValue, filterKey }) {
  if (!items?.length) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
        Suggested {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = activeValue === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onApply(filterKey, item)}
              className={[
                "rounded-full border px-3 py-2 text-xs font-medium transition",
                isActive
                  ? "border-violet-400/40 bg-violet-500/20 text-violet-100"
                  : "border-white/10 bg-white/[0.04] text-zinc-200 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-100",
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SuggestionPanel({ filters, onApplySuggestion }) {
  const bundle = getStateSuggestionBundle(filters.state);

  if (!filters.state || !bundle) {
    return (
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-400">
          Session Guidance
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
          Let FlowTerp guide the session
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Start with a creative state to unlock smart suggestions for effects,
          terpenes, and time-of-day pairings.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.03] to-white/[0.02]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-violet-200/90">
          FlowTerp Suggests
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
          Tune this setup more intelligently
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {bundle.coachNote}
        </p>
      </div>

      <div className="space-y-5 px-5 py-5">
        <SuggestionGroup
          label="effects"
          items={bundle.suggestions.effect}
          onApply={onApplySuggestion}
          activeValue={filters.effect}
          filterKey="effect"
        />

        <SuggestionGroup
          label="terpenes"
          items={bundle.suggestions.terpene}
          onApply={onApplySuggestion}
          activeValue={filters.terpene}
          filterKey="terpene"
        />

        <SuggestionGroup
          label="times"
          items={bundle.suggestions.time_of_day}
          onApply={onApplySuggestion}
          activeValue={filters.time_of_day}
          filterKey="time_of_day"
        />
      </div>
    </div>
  );
}