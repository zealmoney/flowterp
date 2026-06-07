import { useMemo, useState } from "react";

function formatFlowMeta(flow) {
  const filters = flow?.filters_json || {};

  const tags = [
    filters.state,
    filters.effect,
    filters.terpene,
    filters.time_of_day,
    filters.strain_type,
    filters.mode,
  ]
    .filter(Boolean)
    .map((item) => String(item).replace(/-/g, " "));

  return tags.slice(0, 4);
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SavedFlowCard({ flow, onOpenFlow, onDeleteFlow, onRenameFlow }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(flow?.name || "");

  const tags = useMemo(() => formatFlowMeta(flow), [flow]);
  const savedDate = formatDate(flow?.created_at || flow?.updated_at);

  async function handleRenameSubmit(e) {
    e.preventDefault();

    const nextName = draftName.trim();
    if (!nextName || nextName === flow?.name) {
      setIsEditing(false);
      setDraftName(flow?.name || "");
      return;
    }

    const result = await onRenameFlow?.(flow.id, { name: nextName });

    if (result?.ok) {
      setIsEditing(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {isEditing ? (
            <form onSubmit={handleRenameSubmit} className="flex gap-2">
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
                placeholder="Rename flow"
                maxLength={80}
                autoFocus
              />
              <button
                type="submit"
                className="rounded-xl border border-violet-400/30 bg-violet-500/15 px-3 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/25"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h3 className="truncate text-base font-semibold text-white">
                {flow?.name || "Saved Flow"}
              </h3>
              {savedDate ? (
                <p className="mt-1 text-xs text-zinc-500">Saved {savedDate}</p>
              ) : null}
            </>
          )}
        </div>

        {!isEditing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              Rename
            </button>
            <button
              type="button"
              onClick={() => onDeleteFlow?.(flow.id)}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${flow.id}-${tag}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">
          Reapply this setup and rerun recommendations.
        </p>

        <button
          type="button"
          onClick={() => onOpenFlow?.(flow)}
          className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
        >
          Open Flow
        </button>
      </div>
    </div>
  );
}

export default function SavedFlowsPanel({
  flows,
  loading,
  error,
  onOpenFlow,
  onDeleteFlow,
  onRenameFlow,
}) {
  if (loading) {
    return (
      <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
        <p className="text-sm text-zinc-400">Loading saved flows...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
        <p className="text-sm text-red-200">{error}</p>
      </section>
    );
  }

  if (!Array.isArray(flows) || flows.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
            Saved Flows
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Your reusable setups
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Save your best recommendation combinations and reopen them in one click.
          </p>
        </div>

        <div className="text-sm text-zinc-500">
          {flows.length} saved {flows.length === 1 ? "flow" : "flows"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flows.map((flow) => (
          <SavedFlowCard
            key={flow.id}
            flow={flow}
            onOpenFlow={onOpenFlow}
            onDeleteFlow={onDeleteFlow}
            onRenameFlow={onRenameFlow}
          />
        ))}
      </div>
    </section>
  );
}