export default function SmartPresetCard({ preset, onApply }) {
  return (
    <button
      type="button"
      onClick={() => onApply(preset)}
      className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left transition duration-200 hover:border-violet-400/40 hover:bg-violet-500/[0.06] hover:shadow-[0_0_0_1px_rgba(167,139,250,0.15),0_20px_60px_-30px_rgba(139,92,246,0.45)]"
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300/80">
              Smart Preset
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
              {preset.title}
            </h3>
          </div>

          <div className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[11px] font-medium text-violet-200">
            Launch
          </div>
        </div>

        <p className="text-sm leading-6 text-zinc-400">
          {preset.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {preset.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-200"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-6 text-sm font-medium text-violet-300 transition group-hover:text-violet-200">
          Try preset →
        </div>
      </div>
    </button>
  );
}