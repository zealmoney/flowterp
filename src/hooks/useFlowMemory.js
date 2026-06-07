import { useEffect, useState } from "react";
import { getFlowMemory } from "../api/flowMemory";
import { useAuth } from "./useAuth";

export function useFlowMemory() {
  const { isAuthenticated } = useAuth();

  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(Boolean(isAuthenticated));
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!isAuthenticated) {
        setMemory(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getFlowMemory();

        if (mounted) {
          setMemory(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Failed to load assistant memory."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  return {
    memory,
    loading,
    error,
  };
}