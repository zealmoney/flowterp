export default function StrainQuickSummary({ strain }) {
  const summary = strain.quick_summary || {};
  const topState = strain.top_state;
  const topEffect = strain.top_effect;

  return (
    <section className="grid gap-5 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Primary State
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {summary.primary_state || "N/A"}
        </h3>
        <p className="mt-3 text-sm text-zinc-400">
          Best time: {summary.best_time_of_day || "Anytime"}
        </p>
        {topState && (
          <p className="mt-2 text-sm text-zinc-300">
            Match score: <span className="font-medium text-white">{topState.score}</span>
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Primary Effect
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {summary.primary_effect || "N/A"}
        </h3>
        {topEffect && (
          <p className="mt-3 text-sm text-zinc-300">
            Effect score: <span className="font-medium text-white">{topEffect.score}</span>
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Primary Terpene
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {summary.primary_terpene || "N/A"}
        </h3>
        <p className="mt-3 text-sm text-zinc-400">
          Strain type: <span className="capitalize text-zinc-200">{summary.strain_type || "N/A"}</span>
        </p>
      </div>
    </section>
  );
}