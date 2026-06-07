import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createFeedback,
  getMyFeedback,
  updateFeedback,
} from "../api/feedback";

function normalizeFilters(filters) {
  const source = { ...(filters || {}) };
  delete source.page;

  return {
    state: source.state || "",
    effect: source.effect || "",
    terpene: source.terpene || "",
    time_of_day: source.time_of_day || "",
    strain_type: source.strain_type || "",
    featured: Boolean(source.featured),
    min_thc: source.min_thc || "",
    max_thc: source.max_thc || "",
    mode: source.mode || "sharp",
  };
}

function getFeedbackSignature(strainId, filters) {
  const normalized = normalizeFilters(filters);

  return [
    strainId || "",
    normalized.state,
    normalized.effect,
    normalized.terpene,
    normalized.time_of_day,
    normalized.strain_type,
    normalized.featured ? "1" : "0",
    normalized.min_thc,
    normalized.max_thc,
    normalized.mode,
  ].join("|");
}

export function useFeedback(filters, enabled = true) {
  const [feedbackMap, setFeedbackMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");

  const normalizedFilters = useMemo(() => normalizeFilters(filters), [filters]);

  const feedbackMapRef = useRef({});

  const loadFeedback = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError("");

      const data = await getMyFeedback(normalizedFilters);
      const results = Array.isArray(data) ? data : data?.results || [];

      const nextMap = {};

      results.forEach((item) => {
        const signature = getFeedbackSignature(
          item.strain_id || item.strain,
          item.filters_json || normalizedFilters
        );

        nextMap[signature] = item;
      });

      setFeedbackMap(nextMap);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to load feedback."
      );
      setFeedbackMap({});
    } finally {
      setLoading(false);
    }
  }, [enabled, normalizedFilters]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  useEffect(() => {
    feedbackMapRef.current = feedbackMap;
  }, [feedbackMap]);

  const sendFeedback = useCallback(
    async ({ strain_id, feedback, filters_json }) => {
      const signature = getFeedbackSignature(strain_id, filters_json);

      try {
        setLoadingMap((prev) => ({ ...prev, [signature]: true }));
        setError("");

        const existing = feedbackMapRef.current[signature];
        let saved;

        if (existing?.id) {
          saved = await updateFeedback(existing.id, { feedback });
        } else {
          saved = await createFeedback({
            strain_id,
            feedback,
            filters_json: normalizeFilters(filters_json),
          });
        }

        setFeedbackMap((prev) => ({
          ...prev,
          [signature]: saved,
        }));

        return { ok: true, data: saved };
      } catch (err) {
        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to save feedback.";

        setError(message);
        return { ok: false, error: message };
      } finally {
        setLoadingMap((prev) => ({ ...prev, [signature]: false }));
      }
    },
    []
  );

  function getFeedbackForStrain(strainId, currentFilters) {
    const signature = getFeedbackSignature(strainId, currentFilters);
    return feedbackMap[signature] || null;
  }

  function isSavingFeedback(strainId, currentFilters) {
    const signature = getFeedbackSignature(strainId, currentFilters);
    return Boolean(loadingMap[signature]);
  }

  return {
    feedbackMap,
    loading,
    error,
    reload: loadFeedback,
    sendFeedback,
    getFeedbackForStrain,
    isSavingFeedback,
  };
}