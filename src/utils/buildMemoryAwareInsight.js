function humanize(value) {
  return String(value || "").replace(/-/g, " ");
}

export function buildMemoryAwareInsight(memory, filters) {
  if (!memory) {
    return {
      headline: "",
      body: "",
      suggestion: "",
    };
  }

  const topState = memory.top_states?.[0];
  const topEffect = memory.top_effects?.[0];
  const topTerpene = memory.top_terpenes?.[0];
  const topType = memory.top_strain_types?.[0];

  const parts = [];

  if (topState) {
    parts.push(`you’ve been leaning toward ${humanize(topState)} setups`);
  }

  if (topEffect) {
    parts.push(`you often respond well to ${humanize(topEffect)} profiles`);
  }

  if (topTerpene) {
    parts.push(`your recent feedback suggests a preference for ${humanize(topTerpene)}-forward strains`);
  }

  let body = "";
  if (parts.length) {
    body = `I’m noticing that ${parts.join(", ")}.`;
  }

  let suggestion = "";
  if (filters?.state && topState && filters.state !== topState) {
    suggestion = `You usually prefer ${humanize(topState)} flows. Want to compare this setup against your usual profile?`;
  } else if (topType) {
    suggestion = `You’ve shown a pattern toward ${humanize(topType)} strains. I can keep leaning that way or help you explore outside it.`;
  } else {
    suggestion = "The more flows you save and rate, the more tailored these recommendations will become.";
  }

  return {
    headline: "Memory-Aware AI Insight",
    body,
    suggestion,
  };
}