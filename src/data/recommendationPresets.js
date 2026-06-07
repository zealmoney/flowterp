export const recommendationPresets = [
  {
    id: "deep-debug-session",
    title: "Deep Debug Session",
    description:
      "For solving bugs, tracing logic, and staying locked into technical work.",
    filters: {
      state: "debugging-mode",
      effect: "focused",
      time_of_day: "day",
    },
    chips: ["Debugging Mode", "Focused", "Day"],
  },
  {
    id: "architecture-sprint",
    title: "Architecture Sprint",
    description:
      "Built for system-level thinking, mapping flows, and structured technical decisions.",
    filters: {
      state: "system-design-thinking",
      effect: "focused",
      time_of_day: "day",
    },
    chips: ["System Design Thinking", "Focused", "Day"],
  },
  {
    id: "late-night-build-mode",
    title: "Late Night Build Mode",
    description:
      "For after-hours coding sessions when you want depth, momentum, and fewer distractions.",
    filters: {
      state: "deep-focus",
      time_of_day: "night",
    },
    chips: ["Deep Focus", "Night"],
  },
  {
    id: "editing-tunnel-vision",
    title: "Editing Tunnel Vision",
    description:
      "For long-form editing where visual concentration and sustained attention matter most.",
    filters: {
      state: "editing-mode",
      effect: "focused",
      time_of_day: "evening",
    },
    chips: ["Editing Mode", "Focused", "Evening"],
  },
  {
    id: "cinematic-review-session",
    title: "Cinematic Review Session",
    description:
      "For shot review, pacing analysis, and visual decision-making with a more reflective feel.",
    filters: {
      state: "cinematic-review",
      time_of_day: "evening",
    },
    chips: ["Cinematic Review", "Evening"],
  },
  {
    id: "storyboard-ideation",
    title: "Storyboard Ideation",
    description:
      "Use this when exploring visual sequences, scene concepts, and narrative direction.",
    filters: {
      state: "storyboarding-mind",
      effect: "creative",
    },
    chips: ["Storyboarding Mind", "Creative"],
  },
  {
    id: "studio-flow",
    title: "Studio Flow",
    description:
      "Great for music creation sessions that need movement, openness, and creative momentum.",
    filters: {
      state: "music-production-mode",
      effect: "euphoric",
      time_of_day: "evening",
    },
    chips: ["Music Production Mode", "Euphoric", "Evening"],
  },
  {
    id: "sound-sculpting",
    title: "Sound Sculpting",
    description:
      "Designed for texture work, detailed listening, and building immersive sonic layers.",
    filters: {
      state: "sound-design-mode",
      effect: "relaxed",
      time_of_day: "night",
    },
    chips: ["Sound Design Mode", "Relaxed", "Night"],
  },
  {
    id: "idea-storm",
    title: "Idea Storm",
    description:
      "For expanding concepts, unlocking unexpected connections, and generating fresh directions.",
    filters: {
      state: "idea-generation",
      effect: "uplifting",
    },
    chips: ["Idea Generation", "Uplifting"],
  },
  {
    id: "flow-state-entry",
    title: "Flow State Entry",
    description:
      "A balanced creative starting point when you want smooth momentum without overthinking setup.",
    filters: {
      state: "creative-flow",
      effect: "creative",
    },
    chips: ["Creative Flow", "Creative"],
  },
  {
    id: "relaxed-creative-drift",
    title: "Relaxed Creative Drift",
    description:
      "A softer preset for reflective sessions, ambient creation, and gentle exploration.",
    filters: {
      state: "relaxed-creativity",
      time_of_day: "evening",
    },
    chips: ["Relaxed Creativity", "Evening"],
  },
  {
    id: "late-night-vibe-build",
    title: "Late Night Vibe Build",
    description:
      "Best for night sessions where mood, atmosphere, and creative looseness lead the process.",
    filters: {
      state: "late-night-vibes",
      effect: "relaxed",
      time_of_day: "night",
    },
    chips: ["Late Night Vibes", "Relaxed", "Night"],
  },
];