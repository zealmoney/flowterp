import { Link } from "react-router-dom";
import { getDetailStrainImage } from "../../utils/strainImages";

export default function SimilarStrains({ strains = [] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-xl font-semibold text-white">Similar Strains</h2>

      {!strains.length ? (
        <p className="mt-4 text-sm text-zinc-400">No similar strains available yet.</p>
      ) : (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {strains.map((strain) => (
            <article
              key={strain.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={getDetailStrainImage()}
                  alt={strain.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">
                    {strain.name}
                  </h3>
                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-medium capitalize text-violet-300">
                    {strain.strain_type}
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-400">
                  {strain.flavor_profile || "N/A"}
                </p>

                <Link
                  to={`/strains/${strain.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  View details
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}