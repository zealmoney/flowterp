export default function FallbackNotice({ fallbackApplied, fallbackLevel }) {
  if (!fallbackApplied) return null;

  let message = "Showing broadened matches for this setup.";

  if (fallbackLevel === "terpene_removed") {
    message = "No strong exact terpene match was found, so broader matches are being shown.";
  } else if (fallbackLevel === "effect_removed") {
    message = "No strong exact effect match was found, so broader matches are being shown.";
  } else if (fallbackLevel === "thc_removed") {
    message = "Your THC range was narrowed too tightly, so broader matches are being shown.";
  } else if (fallbackLevel === "time_removed") {
    message = "Time-of-day matching was relaxed to show stronger recommendations.";
  }

  return (
    <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
      <p className="text-sm font-medium text-amber-200">
        {message}
      </p>
    </div>
  );
}