import { useState } from "react";
import { Link } from "react-router-dom";
import { useSavedSetups } from "../hooks/useSavedSetups";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "../components/ui/ConfirmModal";
import RenameSetupModal from "../components/saved/RenameSetupModal";

export default function SavedSetupsPage() {
  const { setups, loading, error, renameSetup, removeSetup } =
    useSavedSetups(true);

  const { toast } = useToast();

  const [deleteId, setDeleteId] = useState(null);
  const [renameTarget, setRenameTarget] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleDelete(id) {
    setDeleteId(id);
  }

  async function confirmDelete() {
    if (!deleteId) return;

    setDeleting(true);

    try {
      await removeSetup(deleteId);

      setTimeout(() => {
        toast({
          tone: "success",
          title: "Setup deleted",
          description: "The saved setup was removed.",
        });
      }, 150);

      setDeleteId(null);
    } catch (err) {
      toast({
        tone: "error",
        title: "Failed to delete setup",
        description: "Please try again in a moment.",
      });
    } finally {
      setDeleting(false);
    }
  }

  function handleRename(id, currentName) {
    setRenameTarget({
      id,
      name: currentName || "",
    });
  }

  async function confirmRename(newName) {
    const trimmedName = String(newName || "").trim();

    if (!trimmedName || !renameTarget?.id) return;

    setRenaming(true);

    try {
      await renameSetup(renameTarget.id, trimmedName);

      toast({
        tone: "success",
        title: "Setup renamed",
        description: "Your saved setup name was updated.",
      });

      setRenameTarget(null);
    } catch (err) {
      toast({
        tone: "error",
        title: "Failed to rename setup",
        description: "Please try again in a moment.",
      });
    } finally {
      setRenaming(false);
    }
  }

  function formatFilters(filters) {
    return Object.entries(filters || {})
      .filter(([, value]) => value && value !== "" && value !== 1)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" • ");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-zinc-400">Loading saved setups...</p>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
            FlowTerp Saved Setups
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Your Saved Recommendation Setups
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Reopen, rename, or delete your saved creative recommendation
            combinations anytime.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
            {error}
          </div>
        ) : null}

        {!setups.length ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">
              No saved setups yet
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Save a recommendation setup to quickly return to your favorite
              creative combinations.
            </p>
            <Link
              to="/recommendations"
              className="mt-6 inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
            >
              Go to Recommendations
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {setups.map((setup) => {
              const query = new URLSearchParams();

              Object.entries(setup.filters_json || {}).forEach(([key, value]) => {
                if (value && value !== "" && key !== "page") {
                  query.append(key, value);
                }
              });

              return (
                <article
                  key={setup.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Saved Setup
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {setup.name || "Custom Setup"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {formatFilters(setup.filters_json) || "No filters saved."}
                  </p>

                  <p className="mt-4 text-xs text-zinc-500">
                    Saved on {new Date(setup.created_at).toLocaleString()}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/recommendations?${query.toString()}`}
                      className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400"
                    >
                      Open setup
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRename(setup.id, setup.name)}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
                    >
                      Rename
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(setup.id)}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <ConfirmModal
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete saved setup?"
        description="This will remove the setup from your saved list. This action cannot be undone."
        confirmLabel="Delete setup"
        tone="danger"
        loading={deleting}
      />

      <RenameSetupModal
        open={Boolean(renameTarget)}
        onClose={() => setRenameTarget(null)}
        onSubmit={confirmRename}
        initialName={renameTarget?.name}
        loading={renaming}
      />
    </>
  );
}