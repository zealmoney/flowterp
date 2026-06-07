function formatLabel(value) {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function findBySlug(items = [], slug) {
  return items.find((item) => item.slug === slug) || null;
}

function countDefinedRefinements(filters = {}) {
  let count = 0;

  if (filters.effect) count += 1;
  if (filters.terpene) count += 1;
  if (filters.time_of_day) count += 1;
  if (filters.strain_type) count += 1;
  if (filters.min_thc || filters.max_thc) count += 1;

  return count;
}

export function generateCopilotInsights({
  filters,
  metadata,
  preferences,
  suggestionBundle,
}) {
  const actions = [];
  const warnings = [];

  let title = "AI Co-Pilot";
  let tone = "neutral";
  let message =
    "Start with a creative state and I’ll help tighten the session.";

  const selectedState = findBySlug(metadata?.states, filters?.state);
  const selectedEffect = findBySlug(metadata?.effects, filters?.effect);
  const selectedTerpene = findBySlug(metadata?.terpenes, filters?.terpene);

  const refinementCount = countDefinedRefinements(filters);

  const isSharpMode = filters?.mode !== "explore";
  const isExploreMode = filters?.mode === "explore";

  const suggestedEffect = suggestionBundle?.suggestions?.effect?.[0] || null;
  const suggestedTerpene = suggestionBundle?.suggestions?.terpene?.[0] || null;
  const suggestedTime = suggestionBundle?.suggestions?.time_of_day?.[0] || null;

  if (!filters?.state) {
    if (preferences?.topState) {
      actions.unshift({
        id: "resume-pattern",
        label: `Start with ${formatLabel(preferences.topState)}`,
        description: "Based on your most-used session pattern.",
        type: "apply_filter",
        payload: {
          key: "state",
          value: preferences.topState,
        },
      });

      message =
        "I can help you start faster based on how you usually build sessions.";
    }

    return {
      title,
      tone,
      message,
      warnings,
      actions: actions.slice(0, 4),
    };
  }

  title = "Session Read";
  message = `You’re building a ${
    filters.time_of_day ? `${formatLabel(filters.time_of_day)} ` : ""
  }${selectedState ? selectedState.name : formatLabel(filters.state)} session.`;

  if (refinementCount === 0) {
    tone = "caution";
    warnings.push(
      "This setup is still broad. Results may feel less precise until you refine it."
    );
  }

  if (refinementCount === 1) {
    warnings.push(
      "You’ve started shaping the session, but one more refinement would make ranking smarter."
    );
  }

  if (isExploreMode) {
    tone = "neutral";
    warnings.push(
      "Explore mode broadens the recommendation field. Expect more variety and less precision."
    );
  }

  if (isSharpMode && refinementCount < 2) {
    warnings.push(
      "Sharpen mode works best with at least 2 refinements."
    );
  }

  const optimizationPayload = {};

  if (filters?.state && !filters?.effect && suggestedEffect) {
    optimizationPayload.effect = suggestedEffect;

    actions.push({
      id: "add-effect",
      label: `Add ${formatLabel(suggestedEffect)}`,
      description: "Sharpen the recommendation profile.",
      type: "apply_filter",
      payload: {
        key: "effect",
        value: suggestedEffect,
      },
    });
  }

  if (filters?.state && !filters?.terpene && suggestedTerpene) {
    optimizationPayload.terpene = suggestedTerpene;

    actions.push({
      id: "add-terpene",
      label: `Try ${formatLabel(suggestedTerpene)}`,
      description: "Refine the session with a terpene pairing.",
      type: "apply_filter",
      payload: {
        key: "terpene",
        value: suggestedTerpene,
      },
    });
  }

  if (filters?.state && !filters?.time_of_day && suggestedTime) {
    optimizationPayload.time_of_day = suggestedTime;

    actions.push({
      id: "add-time",
      label: `Set ${formatLabel(suggestedTime)}`,
      description: "Align results to the intended session window.",
      type: "apply_filter",
      payload: {
        key: "time_of_day",
        value: suggestedTime,
      },
    });
  }

  if (Object.keys(optimizationPayload).length >= 2 && isSharpMode) {
    actions.unshift({
      id: "optimize-setup",
      label: "Optimize This Setup",
      description: "Apply the strongest suggested refinements in one step.",
      type: "optimize_setup",
      payload: optimizationPayload,
    });
  }

  if (isExploreMode && filters?.effect) {
    actions.unshift({
      id: "clear-effect",
      label: "Loosen the Effect Filter",
      description: "Open the recommendation field for broader creative options.",
      type: "apply_filter",
      payload: {
        key: "effect",
        value: "",
      },
    });
  }

  if (filters?.state && filters?.effect && !filters?.terpene) {
    message = `This setup is getting tighter with ${
      selectedEffect ? selectedEffect.name : formatLabel(filters.effect)
    }. Add a terpene to make the ranking even smarter.`;
  }

  if (filters?.state && filters?.effect && filters?.terpene) {
    tone = "positive";
    message = `This session is well-defined${
      selectedTerpene ? ` with ${selectedTerpene.name}` : ""
    }. You can run it as-is or tune time-of-day for even stronger matching.`;
  }

  if (
    preferences?.topState &&
    filters?.state &&
    preferences.topState === filters.state &&
    preferences?.topTime &&
    !filters?.time_of_day
  ) {
    actions.unshift({
      id: "use-habit-time",
      label: `Use your usual ${formatLabel(preferences.topTime)} timing`,
      description: "Match this session to how you usually work.",
      type: "apply_filter",
      payload: {
        key: "time_of_day",
        value: preferences.topTime,
      },
    });
  }

  if (
    preferences?.topState &&
    filters?.state &&
    preferences.topState === filters.state &&
    preferences?.topTime &&
    filters?.time_of_day &&
    preferences.topTime !== filters.time_of_day
  ) {
    warnings.push(
      `This timing differs from your usual ${formatLabel(
        preferences.topTime
      )} pattern for this kind of session.`
    );
  }

  if (filters?.min_thc && filters?.max_thc) {
    const min = Number(filters.min_thc);
    const max = Number(filters.max_thc);

    if (!Number.isNaN(min) && !Number.isNaN(max) && min > max) {
      tone = "warning";
      warnings.push(
        "Your THC range is inverted. Minimum THC is higher than maximum THC."
      );

      actions.unshift({
        id: "clear-max-thc",
        label: "Clear max THC",
        description: "Remove the conflicting THC cap.",
        type: "apply_filter",
        payload: {
          key: "max_thc",
          value: "",
        },
      });
    }
  }

  if (
    filters?.state &&
    filters?.time_of_day === "night" &&
    (filters.state === "deep-focus" || filters.state === "debugging-mode") &&
    !filters?.effect
  ) {
    warnings.push(
      "A night session in this mode may benefit from an effect pairing so the ranking stays sharper."
    );
  }

  if (
    filters?.state === "late-night-vibes" &&
    filters?.effect === "focused"
  ) {
    tone = "warning";
    warnings.push(
      "This combination may feel directionally mixed: Late Night Vibes usually performs better with softer pairings."
    );

    if (suggestedEffect && suggestedEffect !== filters.effect) {
      actions.unshift({
        id: "swap-effect",
        label: `Try ${formatLabel(suggestedEffect)} instead`,
        description: "Use a softer effect match for this session type.",
        type: "apply_filter",
        payload: {
          key: "effect",
          value: suggestedEffect,
        },
      });
    }
  }

  if (
    filters?.state === "editing-mode" &&
    filters?.effect === "relaxed"
  ) {
    warnings.push(
      "Editing Mode usually ranks better with more focus-forward pairings."
    );
  }

  return {
    title,
    tone,
    message,
    warnings,
    actions: actions.slice(0, 4),
  };
}