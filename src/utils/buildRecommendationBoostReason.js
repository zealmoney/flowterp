export function buildRecommendationBoostReason(item, filters) {
  if (!item) return null;

  const reasons = [];

  const feedbackAdjustment = Number(item.feedback_adjustment || 0);
  const personalizationAdjustment = Number(item.personalization_adjustment || 0);
  const effectScore = Number(item.matched_effect_score || 0);
  const terpeneScore = Number(item.matched_terpene_score || 0);
  const timeScore = Number(item.matched_time_of_day_score || 0);
  const stateScore = Number(item.recommendation_score || 0);

  if (feedbackAdjustment > 0) {
    reasons.push("Boosted from your past likes");
  }

  if (personalizationAdjustment > 0) {
    if (filters?.terpene && terpeneScore > 0) {
      reasons.push("Matches your preferred terpene profile");
    } else if (filters?.effect && effectScore > 0) {
      reasons.push("Aligned with your preferred effects");
    } else if (filters?.strain_type) {
      reasons.push("Fits your usual strain type");
    } else {
      reasons.push("Aligned with your past preferences");
    }
  }

  if (filters?.effect && effectScore > 0) {
    reasons.push("Strong effect match");
  }

  if (filters?.terpene && terpeneScore > 0) {
    reasons.push("Strong terpene match");
  }

  if (filters?.time_of_day && timeScore > 0) {
    reasons.push("Good time-of-day match");
  }

  if (filters?.state && stateScore >= 0.8) {
    reasons.push(`Excellent ${String(filters.state).replace(/-/g, " ")} match`);
  } else if (filters?.state && stateScore >= 0.6) {
    reasons.push(`Strong ${String(filters.state).replace(/-/g, " ")} match`);
  }

  return [...new Set(reasons)].slice(0, 3);
}