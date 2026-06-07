import { useCallback, useEffect, useState } from "react";
import {
  deleteRecentFlow,
  getRecentFlows,
  trackRecentFlow,
} from "../api/recentFlows";
import {
  deleteGuestRecentFlow,
  getGuestRecentFlows,
  saveGuestRecentFlow,
} from "../utils/recentFlowsStorage";
import { useAuth } from "./useAuth";

const MAX_RECENT_FLOWS = 6;

export function useRecentFlows() {
  const { isAuthenticated } = useAuth();

  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFlows = useCallback(async () => {
    setError("");
    setLoading(true);

    if (!isAuthenticated) {
      try {
        setFlows(getGuestRecentFlows());
      } catch {
        setError("Failed to load recent flows.");
        setFlows([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const data = await getRecentFlows();
      setFlows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to load recent flows.");
      setFlows([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadFlows();
  }, [loadFlows]);

  const trackFlow = useCallback(
    async ({ name, filters_json, source }) => {
      if (!filters_json?.state) return;

      setError("");

      const payload = { name, filters_json, source };

      if (!isAuthenticated) {
        try {
          const next = saveGuestRecentFlow(payload);
          setFlows(next);
        } catch {
          setError("Failed to track recent flow.");
        }
        return;
      }

      try {
        const tracked = await trackRecentFlow(payload);

        setFlows((prev) => {
          const withoutDuplicate = prev.filter((item) => item.id !== tracked.id);
          return [tracked, ...withoutDuplicate].slice(0, MAX_RECENT_FLOWS);
        });
      } catch (err) {
        setError(err?.response?.data?.detail || "Failed to track recent flow.");
      }
    },
    [isAuthenticated]
  );

  const removeFlow = useCallback(
    async (id) => {
      setError("");

      if (!isAuthenticated) {
        try {
          const next = deleteGuestRecentFlow(id);
          setFlows(next);
        } catch {
          setError("Failed to delete recent flow.");
        }
        return;
      }

      try {
        await deleteRecentFlow(id);
        setFlows((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err?.response?.data?.detail || "Failed to delete recent flow.");
      }
    },
    [isAuthenticated]
  );

  return {
    flows,
    loading,
    error,
    reload: loadFlows,
    trackFlow,
    removeFlow,
  };
}