export default function PersonalizationTag({ item }) {
  const feedbackAdjustment = Number(item?.feedback_adjustment || 0);
  const personalizationAdjustment = Number(item?.personalization_adjustment || 0);

  if (feedbackAdjustment <= 0 && personalizationAdjustment <= 0) {
    return null;
  }

  let label = "Recommended for you";

  if (feedbackAdjustment > 0) {
    label = "Based on your past likes";
  } else if (personalizationAdjustment > 0) {
    label = "Based on your preferences";
  }

  return (
    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
      {label}
    </span>
  );
}