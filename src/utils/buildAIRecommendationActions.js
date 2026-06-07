export function buildAIRecommendationActions(filters) {
  const actions = [];

  if (!filters) return actions;

  if (filters.mode === "sharp") {
    actions.push({
      label: "Broaden results",
      type: "optimize_setup",
      payload: { mode: "explore" },
    });
  }

  if (filters.state === "deep-focus") {
    actions.push({
      label: "Make it more energizing",
      type: "apply_filter",
      payload: { key: "state", value: "energy-boost" },
    });
  }

  if (filters.state === "energy-boost") {
    actions.push({
      label: "Make it calmer",
      type: "apply_filter",
      payload: { key: "state", value: "cinematic-review" },
    });
  }

  if (filters.terpene) {
    actions.push({
      label: "Remove terpene filter",
      type: "apply_filter",
      payload: { key: "terpene", value: "" },
    });
  }

  actions.push({
    label: "Reset filters",
    type: "reset",
  });

  return actions.slice(0, 3);
}