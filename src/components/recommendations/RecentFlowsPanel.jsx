import RecentFlowCard from "./RecentFlowCard";

export default function RecentFlowsPanel({
  flows,
  loading,
  error,
  onOpenFlow,
  onDeleteFlow,
}) {
  if (loading) {
    return (
      <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-zinc-400">Loading recent flows...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 p-6 text-red-300">
        {error}
      </section>
    );
  }

  if (!flows.length) {
    return null;
  }

  return (
    <section className="mb-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-violet-500/[0.05] p-6 md:p-7">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300/80">
          Continue Creating
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          Recent Flows
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Jump back into sessions you used recently without rebuilding the setup.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flows.map((flow) => (
          <RecentFlowCard
            key={flow.id}
            flow={flow}
            onOpen={onOpenFlow}
            onDelete={onDeleteFlow}
          />
        ))}
      </div>
    </section>
  );
}