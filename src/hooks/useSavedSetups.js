import { useCallback, useEffect, useState } from "react";
import {
  createSavedSetup,
  deleteSavedSetup,
  getSavedSetups,
  updateSavedSetup,
} from "../api/savedSetups";

export function useSavedSetups(enabled = true) {
  const [setups, setSetups] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSetups = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError("");

    try {
      const data = await getSavedSetups();

      if (Array.isArray(data)) {
        setSetups(data);
      } else if (Array.isArray(data?.results)) {
        setSetups(data.results);
      } else {
        setSetups([]);
      }
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to load saved setups."
      );
      setSetups([]);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const addSetup = useCallback(async (payload) => {
    try {
      setSaving(true);
      setError("");

      const created = await createSavedSetup(payload);

      setSetups((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);

      return {
        ok: true,
        data: created,
      };
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.name?.[0] ||
        err?.message ||
        "Failed to save setup.";

      setError(message);

      return {
        ok: false,
        error: message,
      };
    } finally {
      setSaving(false);
    }
  }, []);

  const renameSetup = useCallback(async (id, name) => {
    try {
      setError("");

      const updated = await updateSavedSetup(id, { name });

      setSetups((prev) =>
        (Array.isArray(prev) ? prev : []).map((item) =>
          item.id === id ? { ...item, ...updated } : item
        )
      );

      return {
        ok: true,
        data: updated,
      };
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.name?.[0] ||
        err?.message ||
        "Failed to rename setup.";

      setError(message);

      return {
        ok: false,
        error: message,
      };
    }
  }, []);

  const removeSetup = useCallback(
    async (id) => {
      const previousSetups = setups;

      setSetups((prev) =>
        (Array.isArray(prev) ? prev : []).filter((item) => item.id !== id)
      );

      try {
        setError("");
        await deleteSavedSetup(id);

        return {
          ok: true,
        };
      } catch (err) {
        setSetups(previousSetups);

        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to delete setup.";

        setError(message);

        return {
          ok: false,
          error: message,
        };
      }
    },
    [setups]
  );

  useEffect(() => {
    loadSetups();
  }, [loadSetups]);

  return {
    setups,
    loading,
    saving,
    error,
    reload: loadSetups,
    addSetup,
    renameSetup,
    removeSetup,
  };
}