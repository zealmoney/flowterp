import { SkeletonBlock, SkeletonText } from "../ui/Skeleton";

export default function StrainsPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SkeletonText className="mb-3 h-4 w-40" />
      <SkeletonText className="h-10 w-96 max-w-full" />
      <SkeletonText className="mt-3 h-4 w-full max-w-3xl" />

      <div className="mt-8">
        <SkeletonBlock className="h-20 w-full" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <SkeletonText className="h-6 w-20" />
          <div className="mt-5 space-y-4">
            {[...Array(5)].map((_, i) => (
              <SkeletonBlock key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <SkeletonText className="h-6 w-40" />
            <SkeletonText className="h-4 w-20" />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <SkeletonBlock className="h-48 w-full rounded-none" />
                <div className="p-5">
                  <SkeletonText className="h-6 w-36" />
                  <SkeletonText className="mt-4 h-4 w-full" />
                  <SkeletonText className="mt-2 h-4 w-4/5" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <SkeletonBlock className="h-16 w-full" />
                    <SkeletonBlock className="h-16 w-full" />
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