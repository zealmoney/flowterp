import { Link } from "react-router-dom";

export default function SelectedStateBanner({ state, onClear }) {
  if (!state) return null;

  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt={state.name}
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/60" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative px-6 py-8 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
              Active Creative State
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {state.name}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              {state.description}
            </p>

            {state.intended_use ? (
              <p className="mt-4 text-sm text-zinc-300">
                <span className="font-medium text-violet-400">Best for:</span>{" "}
                {state.intended_use}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onClear}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
            >
              Clear state
            </button>

            <Link
              to="/"
              className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}