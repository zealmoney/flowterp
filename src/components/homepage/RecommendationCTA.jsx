import { Link } from "react-router-dom";

export default function RecommendationCTA({ states = [] }) {
  const featuredStates = states.filter((s) =>
    ["deep-focus", "creative-flow", "cinematic-review", "idea-generation"].includes(
      s.slug
    )
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
            FlowTerp Intelligence
          </p>

          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Get strain recommendations tailored to your workflow
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Select a creative state and let FlowTerp rank the best strains based on
            effects, terpene profiles, and time of day.
          </p>

          {/* Quick state buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {featuredStates.map((state) => (
              <Link
                key={state.id}
                to={`/recommendations?state=${state.slug}`}
                className="rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm font-medium text-white transition hover:border-violet-400/40 hover:bg-zinc-900"
              >
                {state.name}
              </Link>
            ))}
          </div>

          {/* Time-based quick actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/recommendations?state=deep-focus&time_of_day=morning"
              className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              Morning Focus Setup →
            </Link>

            <Link
              to="/recommendations?state=creative-flow&time_of_day=night"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
            >
              Night Creative Flow →
            </Link>
          </div>

          {/* Full page CTA */}
          <div className="mt-8">
            <Link
              to="/recommendations"
              className="inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Open full recommendation engine
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}