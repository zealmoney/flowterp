import { X, CheckCircle2, AlertCircle, Info, TriangleAlert } from "lucide-react";

const toneMap = {
  success: {
    icon: CheckCircle2,
    border: "border-emerald-400/20",
    bg: "bg-emerald-500/10",
    text: "text-emerald-100",
    iconColor: "text-emerald-300",
  },
  error: {
    icon: AlertCircle,
    border: "border-red-400/20",
    bg: "bg-red-500/10",
    text: "text-red-100",
    iconColor: "text-red-300",
  },
  warning: {
    icon: TriangleAlert,
    border: "border-amber-400/20",
    bg: "bg-amber-500/10",
    text: "text-amber-100",
    iconColor: "text-amber-300",
  },
  info: {
    icon: Info,
    border: "border-violet-400/20",
    bg: "bg-violet-500/10",
    text: "text-zinc-100",
    iconColor: "text-violet-300",
  },
};

export default function ToastItem({
  title,
  description,
  tone = "info",
  onClose,
}) {
  const styles = toneMap[tone] || toneMap.info;
  const Icon = styles.icon;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} shadow-2xl shadow-black/30 backdrop-blur-xl`}
    >
      <div className="flex items-start gap-3 p-4">
        <div className={`mt-0.5 shrink-0 ${styles.iconColor}`}>
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          {title && (
            <p className={`text-sm font-semibold ${styles.text}`}>
              {title}
            </p>
          )}
          {description && (
            <p className="mt-1 text-sm text-zinc-300">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}