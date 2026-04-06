import { Link } from "react-router-dom";

export default function StateRecommendations({ sections = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Top Recommendations by State
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Find the strongest strain matches for the creative state you want to enter.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.state.id}>
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-white">
                {section.state.name}
              </h3>
              <p className="mt-2 max-w-2xl text-zinc-400">
                {section.state.description}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {section.top_recommendations.map((item) => (
                <article
                  key={item.strain_id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src="/images/placeholder-strain.jpg"
                      alt={item.strain_name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium capitalize text-violet-300 backdrop-blur">
                        {item.strain_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
                      {item.strain_name}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          Score
                        </p>
                        <p className="mt-1 font-medium text-white">
                          {item.recommendation_score}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          Best Time
                        </p>
                        <p className="mt-1 font-medium text-white">
                          {item.best_time_of_day || "Anytime"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-zinc-300">
                      <p>
                        <span className="text-zinc-500">Flavor:</span>{" "}
                        {item.flavor_profile || "N/A"}
                      </p>
                    </div>

                    <Link
                      to={`/strains/${item.strain_slug}`}
                      className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
                    >
                      View strain
                      <span className="ml-2 transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}