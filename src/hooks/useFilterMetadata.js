import { useEffect, useState } from "react";
import { getFilterMetadata } from "../api/recommendations";

export function useFilterMetadata() {
  const [data, setData] = useState({
    states: [],
    effects: [],
    terpenes: [],
    strain_types: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMetadata() {
      try {
        const result = await getFilterMetadata();
        setData(result);
      } catch (err) {
        setError("Failed to load filter metadata.");
      } finally {
        setLoading(false);
      }
    }

    loadMetadata();
  }, []);

  return { data, loading, error };
}