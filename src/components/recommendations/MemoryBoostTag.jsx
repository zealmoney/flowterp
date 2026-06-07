export default function MemoryBoostTag({ label, compact = false }) {
  if (!label) return null;

  if (compact) {
    return (
      <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
        {label}
      </span>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
        Memory Influence
      </p>
      <p className="mt-2 text-sm text-cyan-100">
        {label}
      </p>
    </div>
  );
}