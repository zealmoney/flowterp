import { useEffect, useState } from "react";
import { getStrains } from "../api/strains";

export function useStrains(filters) {
  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStrains() {
      setLoading(true);
      setError("");

      try {
        const params = {};

        if (filters.search) params.search = filters.search;
        if (filters.strain_type) params.strain_type = filters.strain_type;
        if (filters.state) params.state = filters.state;
        if (filters.effect) params.effect = filters.effect;
        if (filters.terpene) params.terpene = filters.terpene;
        if (filters.ordering) params.ordering = filters.ordering;
        if (filters.page) params.page = filters.page;

        const result = await getStrains(params);
        setData(result);
      } catch (err) {
        setError("Failed to load strains.");
      } finally {
        setLoading(false);
      }
    }

    loadStrains();
  }, [
    filters.search,
    filters.strain_type,
    filters.state,
    filters.effect,
    filters.terpene,
    filters.ordering,
    filters.page,
  ]);

  return { data, loading, error };
}