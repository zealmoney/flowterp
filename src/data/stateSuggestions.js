export const stateSuggestions = {
  "deep-focus": {
    coachNote:
      "Deep Focus works best when sharpened with clarity-forward pairings and minimal distraction.",
    suggestions: {
      effect: ["focused"],
      terpene: ["pinene", "limonene"],
      time_of_day: ["day", "afternoon"],
    },
  },
  "debugging-mode": {
    coachNote:
      "Debugging Mode benefits from precise, structured energy that supports patience and sustained logic.",
    suggestions: {
      effect: ["focused"],
      terpene: ["pinene", "caryophyllene"],
      time_of_day: ["day", "evening"],
    },
  },
  "system-design-thinking": {
    coachNote:
      "System Design Thinking is strongest when the session stays clear, deliberate, and mentally spacious.",
    suggestions: {
      effect: ["focused", "creative"],
      terpene: ["pinene", "limonene"],
      time_of_day: ["day"],
    },
  },
  "creative-flow": {
    coachNote:
      "Creative Flow works well with uplifting signals that keep momentum alive without becoming too chaotic.",
    suggestions: {
      effect: ["creative", "euphoric"],
      terpene: ["limonene", "caryophyllene"],
      time_of_day: ["afternoon", "evening"],
    },
  },
  "music-production-mode": {
    coachNote:
      "Music Production Mode benefits from flow-friendly pairings that encourage openness, rhythm, and momentum.",
    suggestions: {
      effect: ["euphoric", "creative"],
      terpene: ["limonene", "caryophyllene"],
      time_of_day: ["evening", "night"],
    },
  },
  "sound-design-mode": {
    coachNote:
      "Sound Design Mode works best when the session feels immersive, patient, and detail-aware.",
    suggestions: {
      effect: ["relaxed", "creative"],
      terpene: ["myrcene", "caryophyllene"],
      time_of_day: ["evening", "night"],
    },
  },
  "cinematic-review": {
    coachNote:
      "Cinematic Review pairs well with calmer, perceptive sessions that support careful visual judgment.",
    suggestions: {
      effect: ["relaxed", "focused"],
      terpene: ["myrcene", "pinene"],
      time_of_day: ["evening"],
    },
  },
  "editing-mode": {
    coachNote:
      "Editing Mode usually performs best when focus is sustained and the session remains visually stable.",
    suggestions: {
      effect: ["focused"],
      terpene: ["pinene", "caryophyllene"],
      time_of_day: ["day", "evening"],
    },
  },
  "storyboarding-mind": {
    coachNote:
      "Storyboarding Mind responds well to combinations that support imagination while keeping narrative structure intact.",
    suggestions: {
      effect: ["creative", "uplifting"],
      terpene: ["limonene", "pinene"],
      time_of_day: ["afternoon", "evening"],
    },
  },
  "idea-generation": {
    coachNote:
      "Idea Generation is strongest when the session feels expansive, flexible, and slightly elevated.",
    suggestions: {
      effect: ["uplifting", "creative"],
      terpene: ["limonene", "terpinolene"],
      time_of_day: ["afternoon", "evening"],
    },
  },
  "relaxed-creativity": {
    coachNote:
      "Relaxed Creativity works best when the setup stays soft, open-ended, and low-pressure.",
    suggestions: {
      effect: ["relaxed", "creative"],
      terpene: ["myrcene", "linalool"],
      time_of_day: ["evening"],
    },
  },
  "late-night-vibes": {
    coachNote:
      "Late Night Vibes is designed for softer nighttime sessions with mood, atmosphere, and loosened structure.",
    suggestions: {
      effect: ["relaxed"],
      terpene: ["myrcene", "linalool"],
      time_of_day: ["night"],
    },
  },
};

export function getStateSuggestionBundle(stateSlug) {
  if (!stateSlug) return null;
  return stateSuggestions[stateSlug] || null;
}