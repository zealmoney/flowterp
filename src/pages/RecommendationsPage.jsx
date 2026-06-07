import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import RecommendationFilters from "../components/recommendations/RecommendationFilters";
import RecommendationGrid from "../components/recommendations/RecommendationGrid";
import RecommendationPageSkeleton from "../components/recommendations/RecommendationPageSkeleton";
import TopRecommendationHero from "../components/recommendations/TopRecommendationHero";
import ShareSetupBar from "../components/recommendations/ShareSetupBar";
import SmartPresetRail from "../components/recommendations/SmartPresetRail";
import SuggestionPanel from "../components/recommendations/SuggestionPanel";
import RecentFlowsPanel from "../components/recommendations/RecentFlowsPanel";
import PersonalizedFlowsPanel from "../components/recommendations/PersonalizedFlowsPanel";
import AICopilotPanel from "../components/recommendations/AICopilotPanel";
import RecommendationWhyPanel from "../components/recommendations/RecommendationWhyPanel";
import SavePresetButton from "../components/recommendations/SavePresetButton";
import ModeToggle from "../components/recommendations/ModeToggle";

import PaginationControls from "../components/strains/PaginationControls";
import ResultsSummaryBar from "../components/strains/ResultsSummaryBar";

import { useFilterMetadata } from "../hooks/useFilterMetadata";
import { useRecommendations } from "../hooks/useRecommendations";
import { useRecentFlows } from "../hooks/useRecentFlows";

import { analyzeFlowPreferences } from "../utils/analyzeFlowPreferences";
import { generatePersonalizedInsights } from "../utils/generatePersonalizedInsights";
import { generatePersonalizedFlows } from "../utils/generatePersonalizedFlows";
import { generateCopilotInsights } from "../utils/generateCopilotInsights";
import { buildRecommendationWhy } from "../utils/buildRecommendationWhy";
import { buildPresetName } from "../utils/buildPresetName";

import { getStateSuggestionBundle } from "../data/stateSuggestions";

import SavedFlowsPanel from "../components/recommendations/SavedFlowsPanel";
import { useSavedSetups } from "../hooks/useSavedSetups";
import { useFeedback } from "../hooks/useFeedback";

import FallbackNotice from "../components/recommendations/FallbackNotice";

import { useFlowMemory } from "../hooks/useFlowMemory";

import ChatAssistantPanel from "../components/recommendations/ChatAssistantPanel";

const defaultFilters = {
  state: "",
  effect: "",
  terpene: "",
  time_of_day: "",
  strain_type: "",
  featured: false,
  min_thc: "",
  max_thc: "",
  mode: "sharp",
  page: 1,
};

function getFiltersFromParams(params) {
  return {
    state: params.get("state") || "",
    effect: params.get("effect") || "",
    terpene: params.get("terpene") || "",
    time_of_day: params.get("time_of_day") || "",
    strain_type: params.get("strain_type") || "",
    featured: params.get("featured") === "true",
    min_thc: params.get("min_thc") || "",
    max_thc: params.get("max_thc") || "",
    mode: params.get("mode") || "sharp",
    page: Number(params.get("page") || 1),
  };
}

function buildFlowTrackingKey(sourceFilters) {
  const { page, ...flowFilters } = sourceFilters || {};
  return JSON.stringify(flowFilters);
}

function buildFlowNameFromFilters(filters, metadata) {
  const selectedState = metadata?.states?.find(
    (item) => item.slug === filters.state
  );

  const selectedEffect = metadata?.effects?.find(
    (item) => item.slug === filters.effect
  );

  const selectedTime = filters.time_of_day
    ? filters.time_of_day.replace(/-/g, " ")
    : "";

  if (selectedState && selectedEffect) {
    return `${selectedState.name} · ${selectedEffect.name}`;
  }

  if (selectedState && selectedTime) {
    return `${selectedState.name} · ${selectedTime}`;
  }

  if (selectedState) {
    return selectedState.name;
  }

  return "Custom Flow";
}

export default function RecommendationsPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  const resultsRef = useRef(null);
  const lastTrackedFlowKeyRef = useRef("");
  const [shouldScrollToResults, setShouldScrollToResults] = useState(false);
  const [copilotReady, setCopilotReady] = useState(false);

  const { memory: flowMemory } = useFlowMemory();

  const {
    data: metadata,
    loading: metadataLoading,
    error: metadataError,
  } = useFilterMetadata();

  const {
    flows: recentFlows,
    loading: recentFlowsLoading,
    error: recentFlowsError,
    trackFlow,
    removeFlow,
  } = useRecentFlows();

  const {
    setups: savedSetups,
    loading: savedSetupsLoading,
    saving: savedSetupsSaving,
    error: savedSetupsError,
    addSetup,
    renameSetup,
    removeSetup,
  } = useSavedSetups();

  const queryFilters = useMemo(() => {
    return getFiltersFromParams(searchParams);
  }, [searchParams]);

  const {
    sendFeedback,
    getFeedbackForStrain,
    isSavingFeedback,
  } = useFeedback(queryFilters);

  const { data, loading, error, refetch } = useRecommendations(queryFilters);

  const topRecommendation =
    queryFilters.page === 1 && data?.results?.length
      ? data.results[0]
      : null;

  const remainingRecommendations =
    queryFilters.page === 1 && data?.results?.length
      ? data.results.slice(1)
      : data?.results || [];

  const preferences = useMemo(() => {
    return analyzeFlowPreferences(recentFlows);
  }, [recentFlows]);

  const insights = useMemo(() => {
    return generatePersonalizedInsights(preferences, metadata);
  }, [preferences, metadata]);

  const personalizedFlows = useMemo(() => {
    return generatePersonalizedFlows(preferences);
  }, [preferences]);

  const suggestionBundle = useMemo(() => {
    return getStateSuggestionBundle(queryFilters.state);
  }, [queryFilters.state]);

  const copilotInsight = useMemo(() => {
    return generateCopilotInsights({
      filters: queryFilters,
      metadata,
      preferences,
      suggestionBundle,
    });
  }, [queryFilters, metadata, preferences, suggestionBundle]);

  const recommendationWhyInsight = useMemo(() => {
    return buildRecommendationWhy({
      item: topRecommendation,
      filters: queryFilters,
      metadata,
    });
  }, [topRecommendation, queryFilters, metadata]);

  const presetName = useMemo(() => {
    return buildPresetName(queryFilters, metadata);
  }, [queryFilters, metadata]);

  useEffect(() => {
    const newFilters = getFiltersFromParams(searchParams);

    setFilters((prev) => {
      const isSame = JSON.stringify(prev) === JSON.stringify(newFilters);
      return isSame ? prev : newFilters;
    });
  }, [searchParams]);

  useEffect(() => {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;

      if (key === "featured") {
        if (value === true) params[key] = "true";
        return;
      }

      params[key] = value;
    });

    const next = new URLSearchParams(params).toString();
    const current = searchParams.toString();

    if (next !== current) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  useEffect(() => {
    if (!shouldScrollToResults || loading) return;

    const timeoutId = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setShouldScrollToResults(false);
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [shouldScrollToResults, loading]);

  useEffect(() => {
    if (!queryFilters.state || loading || !metadata) return;

    const flowKey = buildFlowTrackingKey(queryFilters);

    if (lastTrackedFlowKeyRef.current === flowKey) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      trackFlow({
        name: buildFlowNameFromFilters(queryFilters, metadata),
        filters_json: queryFilters,
        source: "manual",
      });

      lastTrackedFlowKeyRef.current = flowKey;
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [queryFilters, metadata, loading, trackFlow]);

  useEffect(() => {
    setCopilotReady(false);

    const timeoutId = window.setTimeout(() => {
      setCopilotReady(true);
    }, 200);

    return () => window.clearTimeout(timeoutId);
  }, [copilotInsight]);

  function handleCopilotAction(action) {
    if (!action) return { message: "", applied: false };

    if (action.type === "reset") {
      lastTrackedFlowKeyRef.current = "";
      setFilters(defaultFilters);
      setShouldScrollToResults(true);

      return {
        message: "I reset your flow. You’re starting fresh now.",
        applied: true,
      };
    }

    if (action.type === "reset_memory_bias") {
      const nextFilters = {
        ...queryFilters,
        effect: "",
        terpene: "",
        strain_type: "",
        page: 1,
      };

      lastTrackedFlowKeyRef.current = buildFlowTrackingKey(nextFilters);
      setFilters(nextFilters);
      setShouldScrollToResults(true);

      return {
        message: "I removed your learned bias so you can explore outside your usual taste.",
        applied: true,
      };
    }

    if (action.type === "optimize_setup") {
      const nextFilters = {
        ...queryFilters,
        ...(action.payload || {}),
        page: 1,
      };

      lastTrackedFlowKeyRef.current = buildFlowTrackingKey(nextFilters);
      setFilters(nextFilters);
      setShouldScrollToResults(true);

      return {
        message: "I adjusted your setup to refine the results.",
        applied: true,
      };
    }

    if (action.type === "apply_filter") {
      const { key, value } = action.payload || {};
      if (!key) return { applied: false };

      const nextFilters = {
        ...queryFilters,
        [key]: value,
        page: 1,
      };

      lastTrackedFlowKeyRef.current = buildFlowTrackingKey(nextFilters);
      setFilters(nextFilters);
      setShouldScrollToResults(true);

      return {
        message: `I updated ${key.replace("_", " ")} to ${value || "none"}.`,
        applied: true,
      };
    }

    return { applied: false };
  }

  function handleChange(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  }

  function handleModeChange(value) {
    setFilters((prev) => ({
      ...prev,
      mode: value,
      page: 1,
    }));
  }

  function handleOpenRecentFlow(flow) {
    setFilters({
      ...defaultFilters,
      ...flow.filters_json,
      mode: flow.filters_json?.mode || "sharp",
      page: 1,
    });

    setShouldScrollToResults(true);
  }

  function handleReset() {
    setFilters(defaultFilters);
  }

  function handleNextPage() {
    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }

  function handlePreviousPage() {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  }

  function handleApplyPreset(preset) {
    const nextFilters = {
      ...defaultFilters,
      ...preset.filters,
      page: 1,
    };

    setFilters(nextFilters);
    setShouldScrollToResults(true);

    trackFlow({
      name: preset.title,
      filters_json: nextFilters,
      source: "preset",
    });

    lastTrackedFlowKeyRef.current = buildFlowTrackingKey(nextFilters);
  }

  function handleApplySuggestion(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));

    setShouldScrollToResults(true);
  }

  function getSavableFilters(sourceFilters) {
    const next = { ...(sourceFilters || {}) };
    delete next.page;
    return next;
  }

  function normalizeFlowFilters(filters) {
    const source = { ...(filters || {}) };

    delete source.page;

    return {
      state: source.state || "",
      effect: source.effect || "",
      terpene: source.terpene || "",
      time_of_day: source.time_of_day || "",
      strain_type: source.strain_type || "",
      featured: Boolean(source.featured),
      min_thc: source.min_thc || "",
      max_thc: source.max_thc || "",
      mode: source.mode || "sharp",
    };
  }

  function getFlowSignature(filters) {
    const normalized = normalizeFlowFilters(filters);

    return [
      normalized.state,
      normalized.effect,
      normalized.terpene,
      normalized.time_of_day,
      normalized.strain_type,
      normalized.featured ? "1" : "0",
      normalized.min_thc,
      normalized.max_thc,
      normalized.mode,
    ].join("|");
  }

  function isDuplicateSetup(filters) {
    const incomingSignature = getFlowSignature(filters);

    return savedSetups.some((setup) => {
      return getFlowSignature(setup?.filters_json) === incomingSignature;
    });
  }

  async function handleSaveSetup() {
    const savableFilters = getSavableFilters(queryFilters);

    if (isDuplicateSetup(savableFilters)) {
      return {
        ok: false,
        error: "This flow is already saved.",
      };
    }

    const result = await addSetup({
      name: presetName || "Custom Flow",
      filters_json: savableFilters,
    });

    if (result?.ok) {
      setShouldScrollToResults(false); // prevents unwanted scroll behavior
    }

    return result;
  }

  function handleOpenSavedFlow(flow) {
    setFilters({
      ...defaultFilters,
      ...(flow?.filters_json || {}),
      mode: flow?.filters_json?.mode || "sharp",
      page: 1,
    });

    setShouldScrollToResults(true);
  }

  if (metadataLoading) {
    return <RecommendationPageSkeleton />;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
          FlowTerp Intelligence
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Get Ranked Strain Recommendations
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Tell FlowTerp what kind of session you want. Use Sharpen for tighter,
          more precise matching or Explore for broader creative options.
        </p>
      </div>

      <RecentFlowsPanel
        flows={recentFlows}
        loading={recentFlowsLoading}
        error={recentFlowsError}
        onOpenFlow={handleOpenRecentFlow}
        onDeleteFlow={removeFlow}
      />

      <SavedFlowsPanel
        flows={savedSetups}
        loading={savedSetupsLoading}
        error={savedSetupsError}
        onOpenFlow={handleOpenSavedFlow}
        onDeleteFlow={removeSetup}
        onRenameFlow={(id, payload) => renameSetup(id, payload?.name)}
      />

      <PersonalizedFlowsPanel
        flows={personalizedFlows}
        insights={insights}
        onApply={handleApplyPreset}
      />

      <SmartPresetRail onApplyPreset={handleApplyPreset} />

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div>
          {metadataError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
              {metadataError}
            </div>
          ) : (
            <RecommendationFilters
              metadata={metadata}
              filters={filters}
              onChange={handleChange}
              onReset={handleReset}
            />
          )}
        </div>

        <section ref={resultsRef} className="scroll-mt-24">
          <ChatAssistantPanel
            filters={queryFilters}
            flowMemory={flowMemory}
            onCopilotAction={handleCopilotAction}
            loading={loading}
            resultCount={data?.count ?? 0}
            topRecommendation={topRecommendation}
          />

          {copilotReady && (
            <AICopilotPanel
              insight={copilotInsight}
              onAction={handleCopilotAction}
            />
          )}

          <SuggestionPanel
            filters={filters}
            onApplySuggestion={handleApplySuggestion}
          />

          <div className="mt-2 mb-2">
            <ModeToggle mode={queryFilters.mode} onChange={handleModeChange} />
          </div>

          <ResultsSummaryBar
            filters={queryFilters}
            metadata={metadata}
            count={data?.count ?? 0}
            loading={loading}
          />

          <FallbackNotice
            fallbackApplied={Boolean(data?.fallback_applied)}
            fallbackLevel={data?.fallback_level}
          />

          {topRecommendation ? (
            <RecommendationWhyPanel insight={recommendationWhyInsight} />
          ) : null}

          <SavePresetButton
            filters={queryFilters}
            presetName={presetName}
            onSave={handleSaveSetup}
            isSaving={savedSetupsSaving}
            error={savedSetupsError}
          />

          {queryFilters.state ? <ShareSetupBar filters={queryFilters} /> : null}

          {!loading && !error && topRecommendation ? (
            <TopRecommendationHero
              item={topRecommendation}
              metadata={metadata}
              filters={queryFilters}
              sendFeedback={sendFeedback}
              getFeedbackForStrain={getFeedbackForStrain}
              isSavingFeedback={isSavingFeedback}
              onCopilotAction={handleCopilotAction}
              flowMemory={flowMemory}
            />
          ) : null}

          <RecommendationGrid
            items={
              topRecommendation
                ? remainingRecommendations
                : data?.results || []
            }
            loading={loading}
            error={error}
            hasState={Boolean(queryFilters.state)}
            filters={queryFilters}
            sendFeedback={sendFeedback}
            getFeedbackForStrain={getFeedbackForStrain}
            isSavingFeedback={isSavingFeedback}
            onRetry={() => {
              refetch();
              setShouldScrollToResults(true);
            }}
            onReset={handleReset}
            onSwitchMode={handleModeChange}
          />

          {!loading && !error && (data?.next || data?.previous) ? (
            <PaginationControls
              currentPage={queryFilters.page}
              hasPrevious={Boolean(data?.previous)}
              hasNext={Boolean(data?.next)}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}