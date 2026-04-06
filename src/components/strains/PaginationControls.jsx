export default function PaginationControls({
  currentPage,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) {
  return (
    <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>

      <p className="text-sm text-zinc-400">Page {currentPage}</p>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}