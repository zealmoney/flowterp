import { SkeletonBlock, SkeletonText } from "../ui/Skeleton";

export default function RecommendationPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SkeletonText className="mb-3 h-4 w-48" />
      <SkeletonText className="h-10 w-80 max-w-full" />
      <SkeletonText className="mt-3 h-4 w-full max-w-3xl" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <SkeletonText className="h-6 w-48" />
          <div className="mt-5 space-y-4">
            {[...Array(7)].map((_, i) => (
              <SkeletonBlock key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>

        <div>
          <SkeletonBlock className="mb-5 h-16 w-full" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <SkeletonBlock className="h-48 w-full rounded-none" />
                <div className="p-5">
                  <SkeletonText className="h-6 w-40" />
                  <SkeletonText className="mt-4 h-4 w-full" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[...Array(4)].map((__, j) => (
                      <SkeletonBlock key={j} className="h-16 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}