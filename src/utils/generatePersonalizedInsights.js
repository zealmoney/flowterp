export function generatePersonalizedInsights(preferences, metadata) {
  if (!preferences.topState) return null;

  const state = metadata?.states?.find(
    (s) => s.slug === preferences.topState
  );

  if (!state) return null;

  const insights = [];

  insights.push({
    type: "habit",
    title: `You often use ${state.name}`,
    description: "FlowTerp can optimize around this pattern.",
  });

  if (preferences.topTime) {
    insights.push({
      type: "time",
      title: `You prefer ${preferences.topTime.replace("-", " ")} sessions`,
      description: "We’ll bias recommendations toward that window.",
    });
  }

  if (preferences.topEffect) {
    insights.push({
      type: "effect",
      title: `You lean toward ${preferences.topEffect}`,
      description: "Expect more matches aligned with this energy.",
    });
  }

  return insights;
}