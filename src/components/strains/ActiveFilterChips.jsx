export default function ActiveFilterChips({
  filters,
  metadata,
  onRemoveFilter,
  onClearAll,
}) {
  const chips = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `Search: ${filters.search}`,
    });
  }

  if (filters.strain_type) {
    const strainType = metadata?.strain_types?.find(
      (item) => item.value === filters.strain_type
    );

    chips.push({
      key: "strain_type",
      label: `Type: ${strainType?.label || filters.strain_type}`,
    });
  }

  if (filters.state) {
    const state = metadata?.states?.find((item) => item.slug === filters.state);

    chips.push({
      key: "state",
      label: `State: ${state?.name || filters.state}`,
    });
  }

  if (filters.effect) {
    const effect = metadata?.effects?.find(
      (item) => item.slug === filters.effect
    );

    chips.push({
      key: "effect",
      label: `Effect: ${effect?.name || filters.effect}`,
    });
  }

  if (filters.terpene) {
    const terpene = metadata?.terpenes?.find(
      (item) => item.slug === filters.terpene
    );

    chips.push({
      key: "terpene",
      label: `Terpene: ${terpene?.name || filters.terpene}`,
    });
  }

  if (filters.ordering && filters.ordering !== "name") {
    const orderingMap = {
      "-name": "Name: Z–A",
      "-thc_max": "Highest THC",
      "thc_max": "Lowest THC",
      "-created_at": "Newest",
    };

    chips.push({
      key: "ordering",
      label: `Sort: ${orderingMap[filters.ordering] || filters.ordering}`,
    });
  }

  if (!chips.length) return null;

  return (
    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-3">
        {chips.map((chip) => (
          <div
            key={chip.key}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-200"
          >
            <span>{chip.label}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(chip.key)}
              className="rounded-full px-1 text-zinc-400 transition hover:text-white"
              aria-label={`Remove ${chip.label}`}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}