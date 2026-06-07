import { useEffect, useState } from "react";
import ModalShell from "../ui/ModalShell";

export default function SaveSetupModal({
  open,
  onClose,
  onSubmit,
  defaultName = "Custom Setup",
  loading = false,
}) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    if (open) {
      setName(defaultName);
    }
  }, [open, defaultName]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Save this setup"
      description="Give this recommendation setup a name so you can find it later."
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSubmit(name.trim() || defaultName)}
            disabled={loading}
            className="rounded-2xl bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save setup"}
          </button>
        </div>
      }
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-zinc-200">
          Setup name
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </label>
    </ModalShell>
  );
}