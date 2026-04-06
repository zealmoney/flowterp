import { useEffect, useState } from "react";
import { getStrainDetail } from "../api/strains";

export function useStrainDetail(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    async function loadStrain() {
      setLoading(true);
      setError("");

      try {
        const result = await getStrainDetail(slug);
        setData(result);
      } catch (err) {
        setError("Failed to load strain details.");
      } finally {
        setLoading(false);
      }
    }

    loadStrain();
  }, [slug]);

  return { data, loading, error };
}