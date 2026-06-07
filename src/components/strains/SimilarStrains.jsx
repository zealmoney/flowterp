import { Link } from "react-router-dom";

export default function SimilarStrains({ strains = [] }) {
  if (!Array.isArray(strains) || !strains.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Similar Strains
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Explore other strains with a similar profile, feel, or creative fit.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {strains.map((strain) => (
          <article
            key={strain.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={strain.image_url || "/images/fallback-strain.jpg"}
                alt={strain.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium capitalize text-violet-300 backdrop-blur">
                  {strain.strain_type}
                </span>

                {strain.is_featured ? (
                  <span className="rounded-full border border-violet-400/20 bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-100 backdrop-blur">
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-semibold text-white transition group-hover:text-violet-300">
                  {strain.name}
                </h3>
              </div>
            </div>

            <div className="p-5">
              <div className="space-y-3 text-sm text-zinc-300">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Flavor
                  </p>
                  <p className="mt-1 break-words">
                    {strain.flavor_profile || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Aroma
                  </p>
                  <p className="mt-1 break-words">
                    {strain.aroma_profile || "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-3">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    THC
                  </p>
                  <p className="mt-1 font-medium text-white">
                    {strain.thc_min ?? "N/A"}% - {strain.thc_max ?? "N/A"}%
                  </p>
                </div>
              </div>

              <Link
                to={`/strains/${strain.slug}`}
                className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                View details
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}