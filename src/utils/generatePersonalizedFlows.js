export function generatePersonalizedFlows(preferences) {
  if (!preferences.topState) return [];

  return [
    {
      id: "personalized-main",
      title: "Your Go-To Flow",
      description: "Based on your recent sessions.",
      filters: {
        state: preferences.topState,
        effect: preferences.topEffect,
        time_of_day: preferences.topTime,
      },
      chips: [
        preferences.topState,
        preferences.topEffect,
        preferences.topTime,
      ].filter(Boolean),
    },
  ];
}