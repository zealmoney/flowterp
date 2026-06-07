export default function AIRecommendationInsight({ insight }) {
  if (!insight?.headline && !insight?.body) return null;

  return (
    <div className="mt-4 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
        {insight.headline}
      </p>

      <p className="mt-2 text-sm leading-7 text-zinc-100">
        {insight.body}
      </p>

      {insight.suggestion ? (
        <p className="mt-3 text-sm text-zinc-300">
          {insight.suggestion}
        </p>
      ) : null}
    </div>
  );
}