import { Link } from "react-router-dom";
import { getDetailStrainImage } from "../../utils/strainImages";
import FeedbackButtons from "./FeedbackButtons";
import RecommendationBoostNotice from "./RecommendationBoostNotice";
import { buildRecommendationBoostReason } from "../../utils/buildRecommendationBoostReason";
import RecommendationWhyDrawer from "./RecommendationWhyDrawer";
import AIRecommendationInsight from "./AIRecommendationInsight";
import { buildAIRecommendationInsight } from "../../utils/buildAIRecommendationInsight";
import AIRecommendationActions from "./AIRecommendationActions";
import { buildAIRecommendationActions } from "../../utils/buildAIRecommendationActions";
import MemoryAwareInsight from "./MemoryAwareInsight";
import { buildMemoryAwareInsight } from "../../utils/buildMemoryAwareInsight";
import MemoryBoostTag from "./MemoryBoostTag";
import { buildMemoryBoostReason } from "../../utils/buildMemoryBoostReason";
import MemoryAwareActions from "./MemoryAwareActions";
import { buildMemoryAwareActions } from "../../utils/buildMemoryAwareActions";
import { useFeedback } from "../../hooks/useFeedback";

export default function TopRecommendationHero({
  item,
  metadata,
  filters,
  onCopilotAction,
  flowMemory,
}) {

  const {
    sendFeedback,
    getFeedbackForStrain,
    isSavingFeedback,
  } = useFeedback(filters);

  if (!item) return null;

  const stateLabel =
    metadata?.states?.find((state) => state.slug === item.state_slug)?.name ||
    item.state_name;

  const effectMatch =
    item.matched_effect_score && Number(item.matched_effect_score) > 0;

  const terpeneMatch =
    item.matched_terpene_score && Number(item.matched_terpene_score) > 0;

  const timeMatch =
    item.matched_time_of_day_score && Number(item.matched_time_of_day_score) > 0;
  
  const boostReasons = buildRecommendationBoostReason(item, filters);

  const aiInsight = buildAIRecommendationInsight(item, filters);

  const aiActions = buildAIRecommendationActions(filters);

  const memoryInsight = buildMemoryAwareInsight(flowMemory, filters);

  const memoryBoostReason = buildMemoryBoostReason(item, flowMemory);

  const memoryActions = buildMemoryAwareActions(flowMemory, filters);

  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        <img
          src={getDetailStrainImage()}
          alt={item.strain_name}
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/60" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
            Top Recommendation
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {item.strain_name}
            </h2>

            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium capitalize text-violet-300">
              {item.strain_type}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            {item.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Final Score
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {item.final_score}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Best State Match
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {stateLabel} ({item.recommendation_score})
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Best Time
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {item.best_time_of_day || "Anytime"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {effectMatch ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                Strong effect alignment
              </span>
            ) : null}

            {terpeneMatch ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                Terpene profile match
              </span>
            ) : null}

            {timeMatch ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                Matches your time of day
              </span>
            ) : null}
          </div>

          <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
            <AIRecommendationInsight insight={aiInsight} />

            <MemoryAwareInsight insight={memoryInsight} />

            <MemoryBoostTag label={memoryBoostReason} />

            <div className="pt-2 space-y-3">
              <MemoryAwareActions
                actions={memoryActions}
                onAction={onCopilotAction}
              />

              <AIRecommendationActions
                actions={aiActions}
                onAction={onCopilotAction || (() => {})}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <RecommendationBoostNotice reasons={boostReasons} />

            <RecommendationWhyDrawer
              item={item}
              filters={filters}
              metadata={metadata}
            />
          </div>

          <div className="mt-8">
            <Link
              to={`/strains/${item.strain_slug}`}
              className="inline-flex items-center rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              View full strain profile
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Flavor Profile
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              {item.flavor_profile || "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Aroma Profile
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              {item.aroma_profile || "N/A"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">THC</p>
            <p className="mt-2 text-sm font-medium text-white">
              {item.thc_min ?? "N/A"}% - {item.thc_max ?? "N/A"}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">CBD</p>
            <p className="mt-2 text-sm font-medium text-white">
              {item.cbd_min ?? "N/A"}% - {item.cbd_max ?? "N/A"}%
            </p>
          </div>

          <FeedbackButtons
            strainId={item.strain_id || item.id}
            filters={filters}
            sendFeedback={sendFeedback}
            getFeedbackForStrain={getFeedbackForStrain}
            isSavingFeedback={isSavingFeedback}
          />
        </div>
      </div>
    </section>
  );
}