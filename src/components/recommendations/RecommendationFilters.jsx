export default function RecommendationFilters({
  metadata,
  filters,
  onChange,
  onReset,
}) {
  return (
    <aside className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recommendation Inputs</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          Reset
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Creative State *
        </label>
        <select
          value={filters.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">Select a state</option>
          {metadata.states.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Effect
        </label>
        <select
          value={filters.effect}
          onChange={(e) => onChange("effect", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">Any effect</option>
          {metadata.effects.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Terpene
        </label>
        <select
          value={filters.terpene}
          onChange={(e) => onChange("terpene", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">Any terpene</option>
          {metadata.terpenes.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Time of Day
        </label>
        <select
          value={filters.time_of_day}
          onChange={(e) => onChange("time_of_day", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">Any time</option>
          {metadata.time_of_day_options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Strain Type
        </label>
        <select
          value={filters.strain_type}
          onChange={(e) => onChange("strain_type", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">Any type</option>
          {metadata.strain_types.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Min THC
          </label>
          <input
            type="number"
            value={filters.min_thc}
            onChange={(e) => onChange("min_thc", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
            placeholder="e.g. 18"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Max THC
          </label>
          <input
            type="number"
            value={filters.max_thc}
            onChange={(e) => onChange("max_thc", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
            placeholder="e.g. 25"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200">
        <input
          type="checkbox"
          checked={filters.featured === "true"}
          onChange={(e) => onChange("featured", e.target.checked ? "true" : "")}
          className="h-4 w-4 accent-violet-500"
        />
        Featured strains only
      </label>
    </aside>
  );
}