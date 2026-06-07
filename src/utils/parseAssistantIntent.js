function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function parseAssistantIntent(input, currentFilters = {}, memory = null) {
  const text = String(input || "").trim().toLowerCase();

  if (!text) {
    return {
      reply: "Tell me how you want to refine this setup, like more energizing, more relaxing, higher THC, or broader results.",
      action: null,
    };
  }

  if (containsAny(text, ["more energizing", "more energy", "energizing", "energy boost"])) {
    return {
      reply: "I’ll shift this toward a more energizing profile.",
      action: {
        type: "apply_filter",
        payload: { key: "state", value: "energy-boost" },
      },
    };
  }

  if (containsAny(text, ["more relaxing", "calmer", "relaxing", "calm"])) {
    return {
      reply: "I’ll move this toward a calmer, more relaxed recommendation style.",
      action: {
        type: "apply_filter",
        payload: { key: "state", value: "cinematic-review" },
      },
    };
  }

  if (containsAny(text, ["broaden", "wider", "more options", "explore"])) {
    return {
      reply: "I’ll broaden the setup so you get a wider mix of matches.",
      action: {
        type: "optimize_setup",
        payload: { mode: "explore" },
      },
    };
  }

  if (containsAny(text, ["stronger thc", "higher thc", "more thc"])) {
    return {
      reply: "I’ll raise the THC range for stronger recommendations.",
      action: {
        type: "optimize_setup",
        payload: {
          min_thc: "20",
          max_thc: "30",
        },
      },
    };
  }

  if (containsAny(text, ["lower thc", "less thc", "milder"])) {
    return {
      reply: "I’ll lower the THC range for a milder set of recommendations.",
      action: {
        type: "optimize_setup",
        payload: {
          min_thc: "",
          max_thc: "18",
        },
      },
    };
  }

  if (containsAny(text, ["remove terpene", "without terpene", "clear terpene"])) {
    return {
      reply: "I’ll remove the terpene restriction and keep the rest of your flow intact.",
      action: {
        type: "apply_filter",
        payload: { key: "terpene", value: "" },
      },
    };
  }

  if (containsAny(text, ["my usual taste", "based on my taste", "my preferences", "what i usually like"])) {
    const preferredState = memory?.top_states?.[0];
    if (preferredState) {
      return {
        reply: `I’ll steer this toward your usual ${preferredState.replace(/-/g, " ")} preference.`,
        action: {
          type: "apply_filter",
          payload: { key: "state", value: preferredState },
        },
      };
    }

    return {
      reply: "I need a little more feedback history before I can lean into your usual taste patterns.",
      action: null,
    };
  }

  if (containsAny(text, ["reset", "start over", "clear filters"])) {
    return {
      reply: "I’ll clear your current setup and start fresh.",
      action: {
        type: "reset",
      },
    };
  }

  return {
    reply: "I can help refine this by making it more energizing, more relaxing, broader, stronger, milder, or closer to your usual taste.",
    action: null,
  };

  if (containsAny(text, ["remove terpene filter", "remove terpene"])) {
    return {
      reply: "I’ll remove the terpene filter and keep the rest of your setup intact.",
      action: {
        type: "apply_filter",
        payload: { key: "terpene", value: "" },
      },
    };
  }

  if (containsAny(text, ["relax the thc range", "wider thc range"])) {
    return {
      reply: "I’ll relax the THC range to widen your results.",
      action: {
        type: "optimize_setup",
        payload: { min_thc: "", max_thc: "" },
      },
    };
  }
}