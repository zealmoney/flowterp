import { SkeletonBlock, SkeletonText } from "../ui/Skeleton";

export default function HomePageSkeleton() {
  return (
    <main className="space-y-10 pb-16">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <SkeletonText className="mb-4 h-4 w-28" />
            <SkeletonText className="h-12 w-72 md:h-16 md:w-[32rem]" />
            <SkeletonText className="mt-3 h-12 w-64 md:h-16 md:w-[24rem]" />
            <SkeletonText className="mt-6 h-4 w-full max-w-2xl" />
            <SkeletonText className="mt-3 h-4 w-full max-w-xl" />
            <div className="mt-10 flex gap-4">
              <SkeletonBlock className="h-11 w-36" />
              <SkeletonBlock className="h-11 w-44" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SkeletonText className="h-8 w-64" />
        <SkeletonText className="mt-3 h-4 w-full max-w-2xl" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <SkeletonText className="h-6 w-40" />
              <SkeletonText className="mt-4 h-4 w-full" />
              <SkeletonText className="mt-2 h-4 w-5/6" />
              <SkeletonText className="mt-4 h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SkeletonText className="h-8 w-56" />
        <SkeletonText className="mt-3 h-4 w-full max-w-2xl" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <SkeletonBlock className="h-52 w-full rounded-none" />
              <div className="p-5">
                <SkeletonText className="h-6 w-40" />
                <SkeletonText className="mt-4 h-4 w-full" />
                <SkeletonText className="mt-2 h-4 w-5/6" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <SkeletonBlock className="h-16 w-full" />
                  <SkeletonBlock className="h-16 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}