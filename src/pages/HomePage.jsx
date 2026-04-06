import HeroSection from "../components/homepage/HeroSection";
import FeaturedStates from "../components/homepage/FeaturedStates";
import FeaturedStrains from "../components/homepage/FeaturedStrains";
import HomePageSkeleton from "../components/homepage/HomePageSkeleton";
import StateRecommendations from "../components/homepage/StateRecommendations";
import SectionGlow from "../components/layout/SectionGlow";
import { useHomepageData } from "../hooks/useHomepageData";

export default function HomePage() {
  const { data, loading, error } = useHomepageData();

  if (loading) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="space-y-10 pb-16">
      <HeroSection />

      <SectionGlow glow="violet" className="mx-auto max-w-7xl">
        <FeaturedStates states={data?.featured_states || []} />
      </SectionGlow>

      <SectionGlow glow="blue" className="mx-auto max-w-7xl">
        <FeaturedStrains strains={data?.featured_strains || []} />
      </SectionGlow>

      <SectionGlow glow="emerald" className="mx-auto max-w-7xl">
        <StateRecommendations sections={data?.state_sections || []} />
      </SectionGlow>
    </main>
  );
}