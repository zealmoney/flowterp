export default function ResultsSummaryBar({ filters, metadata, count = 0, loading }) {
  function getLabel(items = [], key, valueField = "slug", labelField = "name") {
    const match = items.find((item) => item[valueField] === key);
    return match ? match[labelField] : key;
  }

  const parts = [];

  if (filters.search) {
    parts.push(`search results for "${filters.search}"`);
  }

  if (filters.strain_type) {
    const typeLabel =
      metadata?.strain_types?.find((item) => item.value === filters.strain_type)?.label ||
      filters.strain_type;
    parts.push(`${typeLabel.toLowerCase()} strains`);
  }

  if (filters.state) {
    parts.push(`for ${getLabel(metadata?.states, filters.state)}`);
  }

  if (filters.effect) {
    parts.push(`with ${getLabel(metadata?.effects, filters.effect).toLowerCase()} effects`);
  }

  if (filters.terpene) {
    parts.push(`featuring ${getLabel(metadata?.terpenes, filters.terpene).toLowerCase()}`);
  }

  const orderingMap = {
    name: "sorted by Name (A–Z)",
    "-name": "sorted by Name (Z–A)",
    "-thc_max": "sorted by Highest THC",
    thc_max: "sorted by Lowest THC",
    "-created_at": "sorted by Newest",
  };

  const orderingText =
    orderingMap[filters.ordering || "name"] || `sorted by ${filters.ordering}`;

  const summaryText =
    parts.length > 0
      ? `Showing ${parts.join(" ")}`
      : "Showing all available strains";

  return (
    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-300">
          {summaryText}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span>{loading ? "Updating results..." : `${count} result${count === 1 ? "" : "s"}`}</span>
          <span className="hidden md:inline">•</span>
          <span>{orderingText}</span>
        </div>
      </div>
    </div>
  );
}