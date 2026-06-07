import { Link } from "react-router-dom";

function RecommendationMiniCard({ item }) {
  return (
    <Link
      to={`/strains/${item.strain_slug}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-violet-900/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-base font-semibold text-white transition group-hover:text-violet-300">
            {item.strain_name}
          </h4>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
            {item.strain_type}
          </p>
        </div>

        <div className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-200">
          {item.recommendation_score}
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
        {item.description || "A strong match for this creative state."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-3">
          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            THC
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {item.thc_min ?? "N/A"}% - {item.thc_max ?? "N/A"}%
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-3">
          <p className="text-[11px] uppercase tracking-wide text-zinc-500">
            Best Time
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {item.best_time_of_day || "Flexible"}
          </p>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center text-sm font-medium text-violet-400 transition group-hover:text-violet-300">
        View details
        <span className="ml-2 transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}

function getAccentClasses(index) {
  const accents = [
    "from-violet-500/20 to-fuchsia-500/10 text-violet-300",
    "from-sky-500/20 to-cyan-500/10 text-sky-300",
    "from-emerald-500/20 to-teal-500/10 text-emerald-300",
    "from-amber-500/20 to-orange-500/10 text-amber-300",
  ];

  return accents[index % accents.length];
}

export default function StateRecommendations({ sections = [] }) {
  const safeSections = Array.isArray(sections) ? sections : [];

  if (!safeSections.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Recommendations by Creative State
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          See how FlowTerp maps standout strains to different creative modes,
          from deep focus to cinematic review.
        </p>
      </div>

      <div className="space-y-8">
        {safeSections.map((section, index) => {
          const state = section?.state;
          const recommendations = Array.isArray(section?.top_recommendations)
            ? section.top_recommendations
            : [];
          const accentClasses = getAccentClasses(index);

          if (!state) return null;

          return (
            <div
              key={state.slug || index}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${accentClasses} opacity-80 blur-2xl`}
              />

              <div className="relative">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Creative State
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {state.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                      {state.description}
                    </p>
                  </div>

                  <Link
                    to={`/recommendations?state=${state.slug}`}
                    className="inline-flex rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
                  >
                    Explore {state.name}
                  </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Best for
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">
                    {state.intended_use || "Creative exploration"}
                  </p>
                </div>

                {recommendations.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {recommendations.map((item) => (
                      <RecommendationMiniCard
                        key={`${state.slug}-${item.strain_id}`}
                        item={item}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
                    Recommendations for this state are still being populated.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}