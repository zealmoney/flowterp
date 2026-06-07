import { Link } from "react-router-dom";
import FeedbackButtons from "../recommendations/FeedbackButtons";

export default function StrainCard({
  strain,
  filters,
  sendFeedback,
  getFeedbackForStrain,
  isSavingFeedback,
}) {

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-violet-900/20">
      <div className="relative h-48 overflow-hidden">
        <img
          src={strain.image_url || "/images/fallback-strain.jpg"}
          alt={strain.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-medium capitalize text-violet-300 backdrop-blur">
            {strain.strain_type}
          </span>

          {strain.is_featured ? (
            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-200 backdrop-blur">
              Featured
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold text-white transition group-hover:text-violet-300">
            {strain.name}
          </h3>
        </div>

        <div className="mt-4 space-y-3 text-sm text-zinc-300">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Flavor
            </p>
            <p className="mt-1 break-words">{strain.flavor_profile || "N/A"}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Aroma
            </p>
            <p className="mt-1 break-words">{strain.aroma_profile || "N/A"}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                THC
              </p>
              <p className="mt-1 font-medium text-white">
                {strain.thc_min ?? "N/A"}% - {strain.thc_max ?? "N/A"}%
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/70 p-3">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                CBD
              </p>
              <p className="mt-1 font-medium text-white">
                {strain.cbd_min ?? "N/A"}% - {strain.cbd_max ?? "N/A"}%
              </p>
            </div>
          </div>
        </div>

        <FeedbackButtons
          strainId={strain.id}
          filters={filters}
          sendFeedback={sendFeedback}
          getFeedbackForStrain={getFeedbackForStrain}
          isSavingFeedback={isSavingFeedback}
        />

        <Link
          to={`/strains/${strain.slug}`}
          className="mt-5 inline-flex items-center text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          View details
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}