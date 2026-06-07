function getSignalClasses(tone) {
  switch (tone) {
    case "emerald":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
    case "sky":
      return "border-sky-400/20 bg-sky-500/10 text-sky-100";
    case "amber":
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
    case "violet":
      return "border-violet-400/20 bg-violet-500/10 text-violet-100";
    default:
      return "border-white/10 bg-white/[0.05] text-white";
  }
}

export default function RecommendationWhyPanel({ insight }) {
  if (!insight) return null;

  return (
    <section className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-400">
          Why This Recommendation
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
          {insight.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {insight.summary}
        </p>
      </div>

      <div className="px-5 py-5">
        {insight.signals?.length ? (
          <div className="mb-5 flex flex-wrap gap-2">
            {insight.signals.map((signal) => (
              <div
                key={`${signal.label}-${signal.value}`}
                className={`rounded-full border px-3 py-2 text-xs font-medium ${getSignalClasses(signal.tone)}`}
              >
                {signal.label}: {signal.value}
              </div>
            ))}
          </div>
        ) : null}

        {insight.reasons?.length ? (
          <div className="space-y-3">
            {insight.reasons.map((reason) => (
              <div
                key={reason}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-zinc-200"
              >
                {reason}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}