export default function MobileFilterDrawer({
  isOpen,
  onClose,
  metadata,
  filters,
  onFilterChange,
  onReset,
  loading,
  error,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform border-l border-white/10 bg-zinc-950 p-5 shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto pb-8">
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-400">
              Loading filters...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Reset all
                </button>
              </div>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
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
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}