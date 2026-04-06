import { Link, useParams } from "react-router-dom";
import SimilarStrains from "../components/strains/SimilarStrains";
import StrainDetailHero from "../components/strains/StrainDetailHero";
import StrainDetailSkeleton from "../components/strains/StrainDetailSkeleton";
import StrainLinkSection from "../components/strains/StrainLinkSection";
import StrainQuickSummary from "../components/strains/StrainQuickSummary";
import { useStrainDetail } from "../hooks/useStrainDetail";

export default function StrainDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useStrainDetail(slug);

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

          <SimilarStrains strains={data.similar_strains || []} />
        </div>
      </div>
    </main>
  );
}