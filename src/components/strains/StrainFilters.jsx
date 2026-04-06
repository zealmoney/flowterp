export default function StrainFilters({
  metadata,
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <aside className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
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
          Strain Type
        </label>
        <select
          value={filters.strain_type}
          onChange={(e) => onFilterChange("strain_type", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">All strain types</option>
          {metadata.strain_types.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Creative State
        </label>
        <select
          value={filters.state}
          onChange={(e) => onFilterChange("state", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">All states</option>
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
          onChange={(e) => onFilterChange("effect", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">All effects</option>
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
          onChange={(e) => onFilterChange("terpene", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="">All terpenes</option>
          {metadata.terpenes.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Sort By
        </label>
        <select
          value={filters.ordering}
          onChange={(e) => onFilterChange("ordering", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-400"
        >
          <option value="name">Name (A–Z)</option>
          <option value="-name">Name (Z–A)</option>
          <option value="-thc_max">Highest THC</option>
          <option value="thc_max">Lowest THC</option>
          <option value="-created_at">Newest</option>
        </select>
      </div>
    </aside>
  );
}