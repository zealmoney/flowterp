import {
  Brain,
  Sparkles,
  SlidersHorizontal,
  Bookmark,
  Wand2,
  LineChart,
} from "lucide-react";
import SectionGlow from "../components/layout/SectionGlow";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="mb-4 inline-flex rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3 text-violet-200">
        <Icon size={20} />
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-14">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
          About FlowTerp
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Intelligence for Better
          <span className="block text-violet-400">Creative Sessions</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
          FlowTerp is an AI-powered recommendation platform built for creators,
          developers, thinkers, and performance-driven users who want more
          intentional sessions. Instead of generic suggestions, FlowTerp helps
          users shape sessions around focus, energy, clarity, exploration, and
          personal workflow patterns.
        </p>
      </section>

      <SectionGlow glow="violet" className="rounded-[2rem]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
              What FlowTerp Does
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              A smarter way to discover, refine, and repeat great sessions
            </h2>
            <p className="mt-4 text-zinc-400 leading-7">
              FlowTerp combines strain data, terpene intelligence, session
              timing, AI guidance, and user behavior patterns to recommend
              stronger matches for the way people actually work. It is designed
              to feel less like a static directory and more like an adaptive
              creative system.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <FeatureCard
              icon={Brain}
              title="AI Co-Pilot Guidance"
              description="Get real-time guidance as you build a session. FlowTerp can tighten weak setups, suggest stronger pairings, and help you course-correct quickly."
            />

            <FeatureCard
              icon={SlidersHorizontal}
              title="Sharpen and Explore Modes"
              description="Choose between tighter precision or broader creative exploration. FlowTerp adapts the recommendation experience based on the kind of session you want."
            />

            <FeatureCard
              icon={Sparkles}
              title="Smart Presets"
              description="Start faster with curated session templates designed for common creative goals like deep focus, idea generation, editing, and cinematic review."
            />

            <FeatureCard
              icon={Bookmark}
              title="Saved Flows"
              description="Save your strongest setups and return to them instantly. Great sessions should be reusable, not rebuilt from scratch every time."
            />

            <FeatureCard
              icon={Wand2}
              title="Personalized Suggestions"
              description="FlowTerp learns from recent activity and surfaces flows that match how you actually use the product, making recommendations feel more relevant over time."
            />

            <FeatureCard
              icon={LineChart}
              title="Explainable Results"
              description="Recommendations are not a black box. FlowTerp shows why a match surfaced, what signals influenced it, and how refinements changed the outcome."
            />
          </div>
        </div>
      </SectionGlow>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionGlow glow="blue" className="rounded-[2rem]">
          <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
              Why It Exists
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Creative sessions deserve better tools
            </h2>
            <p className="mt-4 text-zinc-400 leading-7">
              Most recommendation tools are generic. They do not account for the
              difference between focused work, open exploration, reviewing,
              editing, or momentum-driven sessions. FlowTerp exists to make
              those distinctions matter.
            </p>
            <p className="mt-4 text-zinc-400 leading-7">
              The goal is not just discovery. It is helping users build better,
              more intentional workflows supported by data and adaptive
              guidance.
            </p>
          </div>
        </SectionGlow>

        <SectionGlow glow="emerald" className="rounded-[2rem]">
          <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
              The Vision
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              A full intelligence layer for creative performance
            </h2>
            <p className="mt-4 text-zinc-400 leading-7">
              FlowTerp is evolving into more than a recommendation site. The
              long-term vision is an intelligent session system that combines
              personal behavior, AI guidance, explainable recommendations, and
              flexible creative modes into one seamless experience.
            </p>
            <p className="mt-4 text-zinc-400 leading-7">
              The future of this product is not just better discovery. It is
              better decision-making for the people who rely on great sessions
              to do their best work.
            </p>
          </div>
        </SectionGlow>
      </div>
    </main>
  );
}