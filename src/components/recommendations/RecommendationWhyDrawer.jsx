import { useMemo, useState } from "react";

function formatPercentLike(value) {
  const num = Number(value || 0);
  if (Number.isNaN(num)) return "0.00";
  return num.toFixed(2);
}

export default function RecommendationWhyDrawer({ item, filters, metadata }) {
  const [open, setOpen] = useState(false);

  const stateLabel = useMemo(() => {
    if (!filters?.state) return null;
    return (
      metadata?.states?.find((state) => state.slug === filters.state)?.name ||
      String(filters.state).replace(/-/g, " ")
    );
  }, [filters, metadata]);

  if (!item) return null;

  const feedbackAdjustment = Number(item.feedback_adjustment || 0);
  const personalizationAdjustment = Number(item.personalization_adjustment || 0);
  const effectScore = Number(item.matched_effect_score || 0);
  const terpeneScore = Number(item.matched_terpene_score || 0);
  const timeScore = Number(item.matched_time_of_day_score || 0);
  const stateScore = Number(item.recommendation_score || 0);

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-medium text-white">Why this recommendation?</p>
          <p className="mt-1 text-xs text-zinc-400">
            See the signals that pushed this strain upward.
          </p>
        </div>

        <span className="text-sm text-zinc-300">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? (
        <div className="border-t border-white/10 px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                State Match
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {stateLabel || "Current state"} · {formatPercentLike(stateScore)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Effect Match
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {formatPercentLike(effectScore)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Terpene Match
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {formatPercentLike(terpeneScore)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Time-of-Day Match
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {formatPercentLike(timeScore)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Feedback Boost
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {feedbackAdjustment >= 0 ? "+" : ""}
                {feedbackAdjustment.toFixed(2)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Preference Boost
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {personalizationAdjustment >= 0 ? "+" : ""}
                {personalizationAdjustment.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-500/10 p-3">
            <p className="text-sm text-emerald-100">
              This strain ranked highly because it combines strong state alignment
              with your active filters, then receives extra lift from your saved
              feedback and learned preferences when available.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}