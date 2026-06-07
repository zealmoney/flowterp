import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedStrains({ strains = [] }) {
  const railRef = useRef(null);

  if (!strains.length) {
    return null;
  }

  function scrollRail(direction) {
    if (!railRef.current) return;

    const cardWidth = 340;
    const gap = 20;
    const amount = direction === "left" ? -(cardWidth + gap) * 2 : (cardWidth + gap) * 2;

    railRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Featured Strains
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            A curated starting point for creators looking for focus, inspiration,
            energy, or late-night review mode.
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollRail("left")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            aria-label="Scroll featured strains left"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollRail("right")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
            aria-label="Scroll featured strains right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 scroll-smooth"
      >
        {strains.map((strain) => (
          <article
            key={strain.id}
            className="group min-w-[300px] max-w-[300px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20 md:min-w-[340px] md:max-w-[340px]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={strain.image_url || "/images/fallback-strain.jpg"}
                alt={strain.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

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

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      THC
                    </p>
                    <p className="mt-1 font-medium text-white">
                      {strain.thc_min ?? "N/A"}% - {strain.thc_max ?? "N/A"}%
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      CBD
                    </p>
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