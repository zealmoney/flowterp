import { Link } from "react-router-dom";
import { getFeaturedStrainImage } from "../../utils/strainImages";

export default function FeaturedStrains({ strains = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Featured Strains
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          A curated starting point for creators looking for focus, inspiration,
          energy, or late-night review mode.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {strains.map((strain) => (
          <article
            key={strain.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={getFeaturedStrainImage()}
                alt={strain.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium capitalize text-violet-300 backdrop-blur">
                  {strain.strain_type}
                </span>

                {strain.is_featured && (
                  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-200 backdrop-blur">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
                {strain.name}
              </h3>

              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Flavor</p>
                  <p className="mt-1">{strain.flavor_profile || "N/A"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Aroma</p>
                  <p className="mt-1">{strain.aroma_profile || "N/A"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">THC</p>
                    <p className="mt-1 font-medium text-white">
                      {strain.thc_min ?? "N/A"}% - {strain.thc_max ?? "N/A"}%
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">CBD</p>
                    <p className="mt-1 font-medium text-white">
                      {strain.cbd_min ?? "N/A"}% - {strain.cbd_max ?? "N/A"}%
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to={`/strains/${strain.slug}`}
                className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                View details
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}