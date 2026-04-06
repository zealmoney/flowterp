import { SkeletonBlock, SkeletonText } from "../ui/Skeleton";

export default function StrainDetailSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SkeletonText className="mb-6 h-4 w-28" />

      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 md:px-10 md:py-14">
          <SkeletonText className="h-6 w-20" />
          <SkeletonText className="mt-5 h-12 w-72" />
          <SkeletonText className="mt-5 h-4 w-full max-w-3xl" />
          <SkeletonText className="mt-2 h-4 w-5/6 max-w-2xl" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonBlock key={i} className="h-24 w-full" />
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <SkeletonText className="h-4 w-28" />
              <SkeletonText className="mt-3 h-8 w-40" />
              <SkeletonText className="mt-3 h-4 w-32" />
            </div>
          ))}
        </section>

        {[...Array(3)].map((_, i) => (
          <section
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <SkeletonText className="h-8 w-52" />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"
                >
                  <SkeletonText className="h-5 w-28" />
                  <SkeletonText className="mt-3 h-4 w-full" />
                  <SkeletonText className="mt-2 h-4 w-5/6" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}