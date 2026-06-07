import { useCallback, useEffect, useMemo, useState } from "react";
import { getRecommendations } from "../api/recommendations";

const emptyRecommendationData = {
  state: null,
  filters: {},
  count: 0,
  next: null,
  previous: null,
  results: [],
};

function buildRecommendationParams(filters = {}) {
  const params = {};

  if (filters.state) params.state = filters.state;
  if (filters.effect) params.effect = filters.effect;
  if (filters.terpene) params.terpene = filters.terpene;
  if (filters.time_of_day) params.time_of_day = filters.time_of_day;
  if (filters.strain_type) params.strain_type = filters.strain_type;
  if (filters.featured === true) params.featured = "true";
  if (filters.min_thc) params.min_thc = filters.min_thc;
  if (filters.max_thc) params.max_thc = filters.max_thc;
  if (filters.mode) params.mode = filters.mode;
  if (filters.page) params.page = filters.page;

  return params;
}

export function useRecommendations(filters) {
  const [data, setData] = useState(emptyRecommendationData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const params = useMemo(() => {
    return buildRecommendationParams(filters);
  }, [filters]);

  const refetch = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!filters.state) {
      setData(emptyRecommendationData);
      setError("");
      setLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadRecommendations() {
      setLoading(true);
      setError("");

      try {
        const result = await getRecommendations(params);

        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err?.response?.data?.detail || "Failed to load recommendations."
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      isCancelled = true;
    };
  }, [filters, params, refreshKey]);

  return { data, loading, error, refetch };
}