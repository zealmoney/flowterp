import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="FlowTerp background"
          className="h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
        <div className="absolute left-[20%] top-[20%] h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-[18%] bottom-[18%] h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            FlowTerp
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Optimize Your
            <span className="block text-violet-400">Creative Flow</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
            Discover strains, terpene profiles, and creative states designed to
            enhance focus, ideation, energy, and cinematic review sessions.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/strains"
              className="rounded-xl bg-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/30"
            >
              Explore Strains
            </Link>

            <a
              href="#featured-states"
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
            >
              Browse Creative States
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}