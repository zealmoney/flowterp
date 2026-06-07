import SmartPresetCard from "./SmartPresetCard";
import { recommendationPresets } from "../../data/recommendationPresets";

export default function SmartPresetRail({ onApplyPreset }) {
  return (
    <section className="mb-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-violet-500/[0.05] p-6 md:p-7">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300/80">
            FlowTerp Intelligence
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Start with a Flow
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Jump into a curated creative setup, then refine it with effects,
            terpenes, or time-of-day inputs.
          </p>
        </div>

        <div className="rounded-full border border-violet-400/15 bg-violet-400/[0.07] px-4 py-2 text-xs font-medium text-violet-200">
          Presets auto-fill your session
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recommendationPresets.map((preset) => (
          <SmartPresetCard
            key={preset.id}
            preset={preset}
            onApply={onApplyPreset}
          />
        ))}
      </div>
    </section>
  );
}