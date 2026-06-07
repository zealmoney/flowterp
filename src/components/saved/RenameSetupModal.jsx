import { useEffect, useState } from "react";
import ModalShell from "../ui/ModalShell";

export default function RenameSetupModal({
  open,
  onClose,
  onSubmit,
  initialName = "",
  loading = false,
}) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (open) {
      setName(initialName || "");
    }
  }, [open, initialName]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Rename setup"
      description="Give this setup a clearer name."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(name.trim())}
            disabled={loading}
            className="rounded-2xl bg-violet-500 px-4 py-2.5 text-sm text-white hover:bg-violet-400 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Rename"}
          </button>
        </div>
      }
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new name"
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white outline-none"
      />
    </ModalShell>
  );
}