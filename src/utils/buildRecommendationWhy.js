function formatLabel(value) {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatScore(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }

  if (number % 1 === 0) {
    return String(number);
  }

  return number.toFixed(1);
}

function buildStrengthLabel(finalScore, mode) {
  const score = Number(finalScore);

  if (Number.isNaN(score)) {
    return mode === "explore" ? "Promising Match" : "Matched";
  }

  if (mode === "explore") {
    if (score >= 18) return "High-Upside Match";
    if (score >= 12) return "Promising Match";
    if (score >= 7) return "Exploratory Match";
    return "Open-Field Match";
  }

  if (score >= 18) return "Exceptional Match";
  if (score >= 12) return "Strong Match";
  if (score >= 7) return "Good Match";
  return "Relevant Match";
}

export function buildRecommendationWhy({
  item,
  filters,
  metadata,
}) {
  if (!item || !filters?.state) return null;

  const reasons = [];
  const signals = [];

  const strainName = item?.strain_name || item?.name || "This strain";

  const selectedState = metadata?.states?.find(
    (entry) => entry.slug === filters.state
  );
  const selectedEffect = metadata?.effects?.find(
    (entry) => entry.slug === filters.effect
  );
  const selectedTerpene = metadata?.terpenes?.find(
    (entry) => entry.slug === filters.terpene
  );

  const stateScore = Number(item.base_state_recommendation_score || 0);
  const effectScore = Number(item.matched_effect_score || 0);
  const terpeneScore = Number(item.matched_terpene_score || 0);
  const timeScore = Number(item.matched_time_of_day_score || 0);
  const finalScore = Number(item.final_score || 0);

  const isExploreMode = filters?.mode === "explore";

  reasons.push(
    selectedState
      ? `${strainName} ranked well for ${selectedState.name}.`
      : `${strainName} matched your selected creative state well.`
  );

  if (stateScore > 0) {
    signals.push({
      label: "State Match",
      value: formatScore(stateScore),
      tone: "violet",
    });
  }

  if (filters.effect && effectScore > 0) {
    reasons.push(
      selectedEffect
        ? `Its profile aligned with your ${selectedEffect.name} refinement.`
        : `It aligned with your selected effect refinement.`
    );

    signals.push({
      label: "Effect Fit",
      value: formatScore(effectScore),
      tone: "emerald",
    });
  }

  if (filters.terpene && terpeneScore > 0) {
    reasons.push(
      selectedTerpene
        ? `${selectedTerpene.name} helped sharpen this recommendation.`
        : `Your terpene pairing helped strengthen the ranking.`
    );

    signals.push({
      label: "Terpene Fit",
      value: formatScore(terpeneScore),
      tone: "sky",
    });
  }

  if (filters.time_of_day && timeScore > 0) {
    reasons.push(
      `Its ranking improved for a ${formatLabel(filters.time_of_day)} session.`
    );

    signals.push({
      label: "Time Match",
      value: formatScore(timeScore),
      tone: "amber",
    });
  }

  if (filters.strain_type && item.strain_type) {
    reasons.push(
      `${item.name} also matches your ${formatLabel(filters.strain_type)} preference.`
    );
  }

  if (!filters.effect && !filters.terpene && !filters.time_of_day) {
    reasons.push(
      isExploreMode
        ? "This result is being surfaced with a broader exploration bias, so the field stays more open."
        : "This match is being driven mostly by your selected creative state, so adding refinements could change the ranking."
    );
  }

  return {
    title: buildStrengthLabel(finalScore, filters?.mode),
    summary: isExploreMode
      ? "FlowTerp ranked this result with a broader exploration bias, blending state alignment with lighter refinement pressure."
      : "FlowTerp ranked this result by blending state alignment, optional refinements, and session context for a tighter match.",
    reasons: reasons.slice(0, 4),
    signals: [
      ...signals,
      {
        label: "Final Score",
        value: formatScore(finalScore),
        tone: "white",
      },
    ],
  };
}