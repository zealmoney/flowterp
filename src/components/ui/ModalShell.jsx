import { X } from "lucide-react";

export default function ModalShell({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/75 backdrop-blur-sm"
        aria-label="Close modal overlay"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.14),transparent_35%)] pointer-events-none" />

        <div className="relative border-b border-white/10 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              {title ? (
                <h2 className="text-xl font-semibold text-white">
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {description}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-200"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="relative px-6 py-5">
          {children}
        </div>

        {footer ? (
          <div className="relative border-t border-white/10 px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}