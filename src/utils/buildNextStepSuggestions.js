export function buildNextStepSuggestions(filters = {}) {
  const suggestions = [];

  if (filters.mode === "sharp") {
    suggestions.push("Broaden the results");
  }

  if (filters.state !== "energy-boost") {
    suggestions.push("Make this more energizing");
  }

  if (filters.state !== "cinematic-review") {
    suggestions.push("Make this more relaxing");
  }

  if (filters.terpene) {
    suggestions.push("Remove terpene filter");
  }

  if (filters.min_thc || filters.max_thc) {
    suggestions.push("Relax the THC range");
  }

  return suggestions.slice(0, 3);
}