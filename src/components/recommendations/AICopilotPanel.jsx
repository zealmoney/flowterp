import CopilotActionButton from "./CopilotActionButton";

function getToneClasses(tone) {
  switch (tone) {
    case "positive":
      return {
        wrapper:
          "border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.10] via-white/[0.03] to-white/[0.02]",
        eyebrow: "text-emerald-200/90",
      };
    case "warning":
    case "caution":
      return {
        wrapper:
          "border-amber-400/20 bg-gradient-to-br from-amber-500/[0.10] via-white/[0.03] to-white/[0.02]",
        eyebrow: "text-amber-200/90",
      };
    default:
      return {
        wrapper:
          "border-violet-400/20 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.03] to-white/[0.02]",
        eyebrow: "text-violet-200/90",
      };
  }
}

export default function AICopilotPanel({ insight, onAction }) {
  if (!insight) return null;

  const toneClasses = getToneClasses(insight.tone);

  return (
    <section
      className={`mb-6 overflow-hidden rounded-3xl border ${toneClasses.wrapper}`}
    >
      <div className="border-b border-white/10 px-5 py-4">
        <p
          className={`text-xs font-medium uppercase tracking-[0.24em] ${toneClasses.eyebrow}`}
        >
          FlowTerp AI Co-Pilot
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
          {insight.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {insight.message}
        </p>

        {insight.warnings?.length ? (
          <div className="mt-4 space-y-2">
            {insight.warnings.map((warning) => (
              <div
                key={warning}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
              >
                {warning}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {insight.actions?.length ? (
        <div className="space-y-3 px-5 py-5">
          {insight.actions.map((action) => (
            <CopilotActionButton
              key={action.id}
              action={action}
              onAction={onAction}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 py-5">
          <p className="text-sm text-zinc-400">
            Your session is already in a strong place.
          </p>
        </div>
      )}
    </section>
  );
}