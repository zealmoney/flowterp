import { getDetailStrainImage } from "../../utils/strainImages";

export default function StrainDetailHero({ strain }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        <img
          src={getDetailStrainImage()}
          alt={strain.name}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-zinc-950/70 to-zinc-950" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium capitalize text-violet-300">
              {strain.strain_type}
            </span>

            {strain.is_featured && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {strain.name}
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            {strain.description || "No description available yet."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">THC</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {strain.thc_min ?? "N/A"}% - {strain.thc_max ?? "N/A"}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">CBD</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {strain.cbd_min ?? "N/A"}% - {strain.cbd_max ?? "N/A"}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Flavor</p>
              <p className="mt-2 text-sm font-medium text-white">
                {strain.flavor_profile || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Aroma</p>
              <p className="mt-2 text-sm font-medium text-white">
                {strain.aroma_profile || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}