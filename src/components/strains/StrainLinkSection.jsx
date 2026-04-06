export default function StrainLinkSection({
  title,
  items = [],
  type = "effect",
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      {!items.length ? (
        <p className="mt-4 text-sm text-zinc-400">No data available.</p>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const linked =
              type === "effect"
                ? item.effect
                : type === "terpene"
                ? item.terpene
                : item.state;

            const scoreValue =
              type === "terpene" ? item.prominence : item.score;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">
                    {linked?.name || "N/A"}
                  </h3>

                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                    {scoreValue}
                  </span>
                </div>

                {linked?.description && (
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {linked.description}
                  </p>
                )}

                {type === "state" && item.best_time_of_day && (
                  <p className="mt-3 text-sm text-zinc-300">
                    <span className="text-zinc-500">Best time:</span>{" "}
                    {item.best_time_of_day}
                  </p>
                )}

                {type === "terpene" && linked?.aroma_profile && (
                  <p className="mt-3 text-sm text-zinc-300">
                    <span className="text-zinc-500">Aroma:</span>{" "}
                    {linked.aroma_profile}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}