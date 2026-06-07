export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange("sharp")}
        className={[
          "rounded-full px-4 py-2 text-sm font-medium transition",
          mode === "sharp"
            ? "bg-violet-500 text-white"
            : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white",
        ].join(" ")}
      >
        Sharpen
      </button>

      <button
        type="button"
        onClick={() => onChange("explore")}
        className={[
          "rounded-full px-4 py-2 text-sm font-medium transition",
          mode === "explore"
            ? "bg-violet-500 text-white"
            : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white",
        ].join(" ")}
      >
        Explore
      </button>
    </div>
  );
}