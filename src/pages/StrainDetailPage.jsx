import { Link, useParams } from "react-router-dom";
import SimilarStrains from "../components/strains/SimilarStrains";
import StrainDetailHero from "../components/strains/StrainDetailHero";
import StrainDetailSkeleton from "../components/strains/StrainDetailSkeleton";
import StrainLinkSection from "../components/strains/StrainLinkSection";
import StrainQuickSummary from "../components/strains/StrainQuickSummary";
import { useStrainDetail } from "../hooks/useStrainDetail";
import { useFeedback } from "../hooks/useFeedback";
import FeedbackButtons from "../components/recommendations/FeedbackButtons";


export default function StrainDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useStrainDetail(slug);

  const feedbackFilters = {
    state: "global",
    effect: "",
    terpene: "",
    time_of_day: "",
    strain_type: "",
    featured: false,
    min_thc: "",
    max_thc: "",
    mode: "global",
  };

  const {
    sendFeedback,
    getFeedbackForStrain,
    isSavingFeedback,
  } = useFeedback(feedbackFilters);

  if (loading) {
    return <StrainDetailSkeleton />;
  }

  if (error || !data) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-red-400">{error || "Strain not found."}</p>
        <Link
          to="/strains"
          className="mt-4 inline-block text-sm font-medium text-violet-400"
        >
          ← Back to strains
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <Link
          to="/strains"
          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          ← Back to strains
        </Link>
      </div>

      <div className="space-y-8">
        <StrainDetailHero strain={data} />
        <StrainQuickSummary strain={data} />

        <div className="grid gap-8">
          <StrainLinkSection
            title="Creative State Matches"
            items={data.strain_state_links || []}
            type="state"
          />

          <StrainLinkSection
            title="Reported Effects"
            items={data.strain_effect_links || []}
            type="effect"
          />

          <StrainLinkSection
            title="Dominant Terpenes"
            items={data.strain_terpene_links || []}
            type="terpene"
          />


          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Your feedback
            </p>

            <div className="mt-3">
              <FeedbackButtons
                strainId={data.id}
                filters={feedbackFilters}
                sendFeedback={sendFeedback}
                getFeedbackForStrain={getFeedbackForStrain}
                isSavingFeedback={isSavingFeedback}
              />
            </div>
          </div>

          <SimilarStrains strains={data.similar_strains || []} />
        </div>
      </div>
    </main>
  );
}