import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getAccentClasses(index) {
  const accents = [
    "from-violet-500/20 to-fuchsia-500/10 text-violet-300",
    "from-sky-500/20 to-cyan-500/10 text-sky-300",
    "from-emerald-500/20 to-teal-500/10 text-emerald-300",
    "from-amber-500/20 to-orange-500/10 text-amber-300",
  ];

  return accents[index % accents.length];
}

export default function FeaturedStates({ states = [] }) {
  const railRef = useRef(null);
  const safeStates = Array.isArray(states) ? states : [];

  function scrollRail(direction) {
    if (!railRef.current) return;

    const cardWidth = 320;
    const gap = 20;
    const amount =
      direction === "left" ? -(cardWidth + gap) * 2 : (cardWidth + gap) * 2;

    railRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }

  console.log("STATES IN FEATURED STATES COMPONENT:", states);

  return (
    <section id="featured-states" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Featured Creative States
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Explore the mental modes creators use for coding, editing, music
            production, writing, and design.
          </p>
        </div>

        {safeStates.length > 0 ? (
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scrollRail("left")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
              aria-label="Scroll featured states left"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollRail("right")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
              aria-label="Scroll featured states right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ) : null}
      </div>

      {safeStates.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-zinc-400">
          Featured states will appear here once homepage data is loaded.
        </div>
      ) : (
        <div
          ref={railRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 scroll-smooth"
        >
          {safeStates.map((state, index) => {
            const accentClasses = getAccentClasses(index);

            return (
              <Link
                key={state.id || state.slug || index}
                to={`/recommendations?state=${state.slug}`}
                className="group relative min-w-[280px] max-w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20 md:min-w-[320px] md:max-w-[320px]"
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${accentClasses} opacity-80 blur-2xl transition duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
                      {state.name}
                    </h3>

                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-zinc-200">
                      Explore
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {state.description || "Discover this creative mode."}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Best for
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-200">
                      {state.intended_use || "Creative exploration"}
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition group-hover:text-violet-300">
                    View matching strains
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}