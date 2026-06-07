import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function FeedbackButtons({
  strainId,
  filters,
  sendFeedback,
  getFeedbackForStrain,
  isSavingFeedback,
}) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const existingFeedback = getFeedbackForStrain?.(strainId, filters);

  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSelected(existingFeedback?.feedback || null);
  }, [existingFeedback]);

  async function handleFeedback(type) {
    if (!sendFeedback || isSavingFeedback?.(strainId, filters)) return;

    // 🔐 Not logged in
    if (!isAuthenticated) {
      toast({
        tone: "warning",
        title: "Login required",
        description: "Log in to save strain preferences.",
      });

      navigate("/login");
      return;
    }

    setMessage("");

    try {
      const result = await sendFeedback({
        strain_id: strainId,
        feedback: type,
        filters_json: filters,
      });

      if (result?.ok) {
        setSelected(type);
        setMessage("Thanks for the feedback.");

        toast({
          tone: "success",
          title:
            type === "like"
              ? "Preference learned"
              : "Preference updated",
        });
      }
    } catch (err) {
      toast({
        tone: "error",
        title: "Couldn’t save feedback",
      });
    }
  }

  const saving = isSavingFeedback?.(strainId, filters);

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        Was this helpful?
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleFeedback("like")}
          disabled={saving}
          className={`rounded-xl border px-3 py-1.5 text-sm transition disabled:opacity-50 ${
            selected === "like"
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
              : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
          }`}
        >
          👍 Like
        </button>

        <button
          type="button"
          onClick={() => handleFeedback("dislike")}
          disabled={saving}
          className={`rounded-xl border px-3 py-1.5 text-sm transition disabled:opacity-50 ${
            selected === "dislike"
              ? "border-red-400 bg-red-500/20 text-red-200"
              : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
          }`}
        >
          👎 Dislike
        </button>
      </div>

      {message ? (
        <p className="mt-2 text-xs text-zinc-400">{message}</p>
      ) : null}
    </div>
  );
}