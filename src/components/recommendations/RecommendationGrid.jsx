import RecommendationCard from "./RecommendationCard";

export default function RecommendationGrid({
  items = [],
  loading,
  error,
  hasState,
  filters,
  flowMemory,
  sendFeedback,
  getFeedbackForStrain,
  isSavingFeedback,
  onRetry,
  onReset,
  onSwitchMode,
}) {
  const isExploreMode = filters?.mode === "explore";

  if (!hasState) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center md:p-10">
        <h3 className="text-xl font-semibold text-white">
          Start with a creative state
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Choose a state like Deep Focus, Creative Flow, or Cinematic Review to
          get ranked recommendations.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="h-4 w-72 max-w-full rounded bg-white/10" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-40 rounded-2xl bg-white/5" />
            <div className="h-40 rounded-2xl bg-white/5" />
            <div className="hidden h-40 rounded-2xl bg-white/5 xl:block" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">
          Couldn’t load recommendations
        </h3>
        <p className="mt-3 text-sm leading-6 text-red-200/90">{error}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">
          No strong matches found
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {isExploreMode
            ? "This explore setup is still not returning a strong match. Try loosening one filter or switching to a different creative state."
            : "This sharpened setup may be too narrow. Try removing one or two filters, broadening the THC range, or switching to Explore mode."}
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
          >
            Reset Filters
          </button>

          {!isExploreMode ? (
            <button
              type="button"
              onClick={() => onSwitchMode?.("explore")}
              className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              Switch to Explore
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <RecommendationCard
          key={`${item.strain_id || item.id}-${item.state_slug || "item"}`}
          item={item}
          filters={filters}
          flowMemory={flowMemory}
          sendFeedback={sendFeedback}
          getFeedbackForStrain={getFeedbackForStrain}
          isSavingFeedback={isSavingFeedback}
        />
      ))}
    </div>
  );
}