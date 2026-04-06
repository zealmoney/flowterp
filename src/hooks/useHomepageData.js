import { useEffect, useState } from "react";
import { getHomepageData } from "../api/recommendations";

export function useHomepageData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomepage() {
      try {
        const result = await getHomepageData();
        setData(result);
      } catch (err) {
        setError("Failed to load homepage data.");
      } finally {
        setLoading(false);
      }
    }

    loadHomepage();
  }, []);

  return { data, loading, error };
}