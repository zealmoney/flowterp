import StrainCard from "./StrainCard";

function EmptyState({ hasActiveFilters, onClearFilters }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
        <span className="text-2xl">⌕</span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">
        No matching strains found
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
        We couldn’t find any strains that match your current search and filter
        combination.
      </p>

      <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/50 p-5 text-left">
        <p className="text-sm font-medium text-white">Try one of these:</p>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400">
          <li>• Remove one or two filters to broaden the results</li>
          <li>• Try a different creative state, effect, or terpene</li>
          <li>• Search by strain name, flavor, aroma, or lineage</li>
          <li>• Reset all filters and start from a wider selection</li>
        </ul>
      </div>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}

export default function StrainGrid({
  strains = [],
  loading,
  error,
  hasActiveFilters = false,
  onClearFilters,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-zinc-400">
        Loading strains...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-red-300">
        {error}
      </div>
    );
  }

  if (!strains.length) {
    return (
      <EmptyState
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {strains.map((strain) => (
        <StrainCard key={strain.id} strain={strain} />
      ))}
    </div>
  );
}