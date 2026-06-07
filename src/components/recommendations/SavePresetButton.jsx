import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function hasMeaningfulFilters(filters) {
  if (!filters || typeof filters !== "object") return false;

  const keysToCheck = [
    "state",
    "effect",
    "terpene",
    "time_of_day",
    "strain_type",
    "featured",
    "min_thc",
    "max_thc",
    "mode",
  ];

  return keysToCheck.some((key) => {
    const value = filters[key];

    if (typeof value === "boolean") return value === true;
    return value !== "" && value !== null && value !== undefined;
  });
}

export default function SavePresetButton({
  filters,
  presetName,
  onSave,
  isSaving = false,
  error = "",
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");

  const [clicked, setClicked] = useState(false);

  const canSave = useMemo(() => {
    return hasMeaningfulFilters(filters);
  }, [filters]);

  useEffect(() => {
    if (!error) return;
    setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (!message && !localError) return;

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      setLocalError("");
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [message, localError]);

  async function handleSave() {
    if (!canSave || isSaving || clicked) return;

    setClicked(true);
    setMessage("");
    setLocalError("");

    if (!isAuthenticated) {
      setClicked(false);
      navigate("/login");
      return;
    }

    if (!onSave) {
      setClicked(false);
      return;
    }

    const result = await onSave();

    if (result?.ok) {
      setMessage("Flow saved.");
    } else {
      setLocalError(result?.error || "Failed to save flow.");
    }

    setClicked(false);
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !canSave}
          className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:border-violet-400/40 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save This Flow"}
        </button>

        {message ? (
          <span className="text-sm text-emerald-300">{message}</span>
        ) : null}

        {localError ? (
          <span className="text-sm text-red-300">{localError}</span>
        ) : null}
      </div>
    </div>
  );
}