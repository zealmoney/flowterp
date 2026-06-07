function humanize(value) {
  return String(value || "").replace(/-/g, " ");
}

export function buildMemoryAwareActions(memory, filters) {
  const actions = [];

  if (!memory) return actions;

  const topState = memory.top_states?.[0];
  const topEffect = memory.top_effects?.[0];
  const topTerpene = memory.top_terpenes?.[0];
  const topType = memory.top_strain_types?.[0];

  if (topState && filters?.state !== topState) {
    actions.push({
      label: `Try my usual ${humanize(topState)} flow`,
      type: "apply_filter",
      payload: { key: "state", value: topState },
    });
  }

  if (topEffect && filters?.effect !== topEffect) {
    actions.push({
      label: `Lean into ${humanize(topEffect)}`,
      type: "apply_filter",
      payload: { key: "effect", value: topEffect },
    });
  }

  if (topTerpene && filters?.terpene !== topTerpene) {
    actions.push({
      label: `Show more ${humanize(topTerpene)}`,
      type: "apply_filter",
      payload: { key: "terpene", value: topTerpene },
    });
  }

  if (topType && filters?.strain_type !== topType) {
    actions.push({
      label: `Keep it ${humanize(topType)}`,
      type: "apply_filter",
      payload: { key: "strain_type", value: topType },
    });
  }

  actions.push({
    label: "Break out of my usual pattern",
    type: "reset_memory_bias",
  });

  return actions.slice(0, 3);
}