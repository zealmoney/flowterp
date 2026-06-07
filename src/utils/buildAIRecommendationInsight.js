function formatStateLabel(state) {
  if (!state) return "current";
  return String(state).replace(/-/g, " ");
}

export function buildAIRecommendationInsight(item, filters) {
  if (!item) {
    return {
      headline: "",
      body: "",
      suggestion: "",
    };
  }

  const feedbackAdjustment = Number(item.feedback_adjustment || 0);
  const personalizationAdjustment = Number(item.personalization_adjustment || 0);
  const effectScore = Number(item.matched_effect_score || 0);
  const terpeneScore = Number(item.matched_terpene_score || 0);
  const timeScore = Number(item.matched_time_of_day_score || 0);
  const stateScore = Number(item.recommendation_score || 0);

  const stateLabel = formatStateLabel(filters?.state);

  let strength = "good";
  if (stateScore >= 0.85) strength = "strong";
  else if (stateScore >= 0.7) strength = "very solid";

  const reasons = [];

  reasons.push(`it’s a ${strength} match for your ${stateLabel} setup`);

  if (effectScore > 0 && filters?.effect) {
    reasons.push("it aligns well with your selected effect");
  }

  if (terpeneScore > 0 && filters?.terpene) {
    reasons.push("it matches your terpene preference");
  }

  if (timeScore > 0 && filters?.time_of_day) {
    reasons.push("it fits your preferred time of day");
  }

  if (feedbackAdjustment > 0) {
    reasons.push("it’s boosted by strains you’ve liked before");
  }

  if (personalizationAdjustment > 0) {
    reasons.push("it lines up with your broader preference patterns");
  }

  const body =
    reasons.length > 1
      ? `I’m recommending ${item.strain_name} because ${reasons.join(", ")}.`
      : `I’m recommending ${item.strain_name} because ${reasons[0]}.`;

  let suggestion = "";

  if (filters?.mode === "sharp") {
    suggestion =
      "Want a wider mix of options? Switch to Explore mode for broader creative matches.";
  } else if (filters?.terpene) {
    suggestion =
      "If you want a more flexible result set, try removing the terpene filter and keeping the same state.";
  } else if (personalizationAdjustment > 0) {
    suggestion =
      "You seem to respond well to this style of strain. Saving this flow will help FlowTerp personalize future recommendations even more.";
  } else {
    suggestion =
      "Giving feedback on a few strains will help FlowTerp personalize this recommendation style more accurately.";
  }

  let headline = "FlowTerp AI Insight";

  if (feedbackAdjustment > 0 || personalizationAdjustment > 0) {
    headline = "Personalized AI Insight";
  }

  return {
    headline,
    body,
    suggestion,
  };
}