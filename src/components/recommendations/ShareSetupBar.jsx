import { useState } from "react";
import { createSavedSetup } from "../../api/savedSetups";
import { useAuth } from "../../hooks/useAuth";
import SaveSetupModal from "./SaveSetupModal";
import { useToast } from "../../context/ToastContext";

export default function ShareSetupBar({ filters }) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  function buildQueryString() {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "" && key !== "page") {
        params.append(key, value);
      }
    });

    return `${window.location.origin}/recommendations?${params.toString()}`;
  }

  function buildDefaultName() {
    const parts = [];

    if (filters.state) {
      parts.push(
        filters.state
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }

    if (filters.time_of_day) {
      parts.push(
        filters.time_of_day
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }

    return parts.length ? parts.join(" • ") : "Custom Setup";
  }

  const shareUrl = buildQueryString();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      toast({
        tone: "success",
        title: "Link copied",
        description: "Recommendation link copied to clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        tone: "error",
        title: "Copy failed",
        description: "Couldn’t copy the link right now.",
      });
    }
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FlowTerp Recommendation",
          text: "Check out this strain setup I found",
          url: shareUrl,
        });
      } catch (err) {
        // user cancel should usually stay silent
      }
    } else {
      handleCopy();
    }
  }

  function handleSaveClick() {
    if (!isAuthenticated) {
      toast({
        tone: "warning",
        title: "Login required",
        description: "Please log in to save setups to your account.",
      });
      return;
    }

    setSaveModalOpen(true);
  }

  async function handleSaveSubmit(customName) {
    setSaving(true);

    try {
      await createSavedSetup({
        name: customName || buildDefaultName(),
        filters_json: filters,
      });

      setSaveModalOpen(false);

      toast({
        tone: "success",
        title: "Setup saved",
        description: "This setup is now available in your saved flows.",
      });
    } catch (error) {
      toast({
        tone: "error",
        title: "Couldn’t save setup",
        description: "Please try again in a moment.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-300">
            Share or save this recommendation setup
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>

            <button
              onClick={handleNativeShare}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
            >
              Share
            </button>

            <button
              onClick={handleSaveClick}
              disabled={saving}
              className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save setup"}
            </button>
          </div>
        </div>
      </div>

      <SaveSetupModal
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSubmit={handleSaveSubmit}
        defaultName={buildDefaultName()}
        loading={saving}
      />
    </>
  );
}