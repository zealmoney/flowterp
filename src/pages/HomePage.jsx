import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/homepage/HeroSection";
import FeaturedStates from "../components/homepage/FeaturedStates";
import FeaturedStrains from "../components/homepage/FeaturedStrains";
import HomePageSkeleton from "../components/homepage/HomePageSkeleton";
import StateRecommendations from "../components/homepage/StateRecommendations";
import RecommendationCTA from "../components/homepage/RecommendationCTA";
import SectionGlow from "../components/layout/SectionGlow";

import RecentFlowsPanel from "../components/recommendations/RecentFlowsPanel";
import PersonalizedFlowsPanel from "../components/recommendations/PersonalizedFlowsPanel";

import { useHomepageData } from "../hooks/useHomepageData";
import { useRecentFlows } from "../hooks/useRecentFlows";
import { analyzeFlowPreferences } from "../utils/analyzeFlowPreferences";
import { generatePersonalizedInsights } from "../utils/generatePersonalizedInsights";
import { generatePersonalizedFlows } from "../utils/generatePersonalizedFlows";

function buildFlowUrl(flow) {
  const params = new URLSearchParams();

  Object.entries(flow?.filters_json || {}).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === false
    ) {
      return;
    }

    if (key === "featured") {
      if (value === true) {
        params.set(key, "true");
      }
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString
    ? `/recommendations?${queryString}`
    : "/recommendations";
}

export default function HomePage() {
  const navigate = useNavigate();

  const { data, loading, error } = useHomepageData();

  const {
    flows: recentFlows,
    loading: recentFlowsLoading,
    error: recentFlowsError,
    removeFlow,
  } = useRecentFlows();

  const states = Array.isArray(data?.states) ? data.states : [];
  const featuredStrains = Array.isArray(data?.featured_strains)
    ? data.featured_strains
    : [];
  const stateSections = Array.isArray(data?.state_sections)
    ? data.state_sections
    : [];

  const featuredStates = useMemo(() => {
    if (Array.isArray(data?.featured_states) && data.featured_states.length) {
      return data.featured_states;
    }

    if (Array.isArray(data?.state_sections) && data.state_sections.length) {
      return data.state_sections
        .map((section) => section?.state)
        .filter(Boolean);
    }

    return [];
  }, [data]);

  const preferences = useMemo(() => {
    return analyzeFlowPreferences(recentFlows);
  }, [recentFlows]);

  const personalizedInsights = useMemo(() => {
    return generatePersonalizedInsights(preferences, data);
  }, [preferences, data]);

  const personalizedFlows = useMemo(() => {
    return generatePersonalizedFlows(preferences);
  }, [preferences]);

  const hasRecentFlows = Array.isArray(recentFlows) && recentFlows.length > 0;
  const hasPersonalizedFlows =
    Array.isArray(personalizedFlows) && personalizedFlows.length > 0;
  const hasFeaturedStates = featuredStates.length > 0;
  const hasFeaturedStrains = featuredStrains.length > 0;
  const hasStateSections = stateSections.length > 0;

  function handleOpenRecentFlow(flow) {
    navigate(buildFlowUrl(flow));
  }

  function handleApplyPersonalizedFlow(flow) {
    navigate(buildFlowUrl({ filters_json: flow.filters }));
  }

  if (loading) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="space-y-8 pb-16 md:space-y-10">
      <HeroSection />

      {(hasRecentFlows || recentFlowsLoading || recentFlowsError) ? (
        <div className="mx-auto max-w-7xl px-6">
          <RecentFlowsPanel
            flows={recentFlows}
            loading={recentFlowsLoading}
            error={recentFlowsError}
            onOpenFlow={handleOpenRecentFlow}
            onDeleteFlow={removeFlow}
          />
        </div>
      ) : null}

      {hasPersonalizedFlows ? (
        <div className="mx-auto max-w-7xl px-6">
          <PersonalizedFlowsPanel
            flows={personalizedFlows}
            insights={personalizedInsights}
            onApply={handleApplyPersonalizedFlow}
          />
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-6">
        <RecommendationCTA states={states} />
      </div>

      {hasFeaturedStates ? (
        <SectionGlow glow="violet" className="mx-auto max-w-7xl">
          <FeaturedStates states={featuredStates} />
        </SectionGlow>
      ) : null}

      {hasFeaturedStrains ? (
        <SectionGlow glow="blue" className="mx-auto max-w-7xl">
          <FeaturedStrains strains={featuredStrains} />
        </SectionGlow>
      ) : null}

      {hasStateSections ? (
        <SectionGlow glow="emerald" className="mx-auto max-w-7xl">
          <StateRecommendations sections={stateSections} />
        </SectionGlow>
      ) : null}
    </main>
  );
}