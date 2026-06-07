export default function PersonalizedFlowsPanel({
  flows,
  insights,
  onApply,
}) {
  if (!flows?.length) return null;

  return (
    <section className="mb-8 rounded-[2rem] border border-violet-400/20 bg-violet-500/[0.06] p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">
          Personalized
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Because You Use
        </h2>

        {insights?.[0] && (
          <p className="mt-2 text-sm text-zinc-300">
            {insights[0].title}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => onApply(flow)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left hover:border-violet-400/40"
          >
            <h3 className="text-lg font-semibold text-white">
              {flow.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {flow.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {flow.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 px-2 py-1 text-xs text-zinc-200"
                >
                  {chip}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}