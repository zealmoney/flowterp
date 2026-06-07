import { Link } from "react-router-dom";
import { getFeaturedStrainImage } from "../../utils/strainImages";
import FeedbackButtons from "./FeedbackButtons";
import RecommendationBoostNotice from "./RecommendationBoostNotice";
import { buildRecommendationBoostReason } from "../../utils/buildRecommendationBoostReason";
import PersonalizationTag from "./PersonalizationTag";
import MemoryBoostTag from "./MemoryBoostTag";
import { buildMemoryBoostReason } from "../../utils/buildMemoryBoostReason";

export default function RecommendationCard({
  item,
  filters,
  flowMemory,
  sendFeedback,
  getFeedbackForStrain,
  isSavingFeedback,
}) {
  const boostReasons = buildRecommendationBoostReason(item, filters);
  const memoryBoostReason = buildMemoryBoostReason(item, flowMemory);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getFeaturedStrainImage()}
          alt={item.strain_name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium capitalize text-violet-300 backdrop-blur">
            {item.strain_type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
            {item.strain_name}
            {Number(item.personalization_adjustment || 0) > 0 ? (
              <p className="mt-2 text-sm text-emerald-300">
                Tailored to your preferences
              </p>
            ) : null}
          </h3>
          
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            {item.final_score}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <PersonalizationTag item={item} />
          <MemoryBoostTag label={memoryBoostReason} compact />
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {item.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">State</p>
            <p className="mt-1 font-medium text-white">
              {item.recommendation_score}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Effect</p>
            <p className="mt-1 font-medium text-white">
              {item.matched_effect_score}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Terpene</p>
            <p className="mt-1 font-medium text-white">
              {item.matched_terpene_score}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Time Match</p>
            <p className="mt-1 font-medium text-white">
              {item.matched_time_of_day_score}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-300">
          <span className="text-zinc-500">Best time:</span>{" "}
          {item.best_time_of_day || "Anytime"}
        </p>

        <RecommendationBoostNotice reasons={boostReasons} compact />

        <FeedbackButtons
          strainId={item.strain_id || item.id}
          filters={filters}
          sendFeedback={sendFeedback}
          getFeedbackForStrain={getFeedbackForStrain}
          isSavingFeedback={isSavingFeedback}
        />

        <Link
          to={`/strains/${item.strain_slug}`}
          className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          View strain
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}