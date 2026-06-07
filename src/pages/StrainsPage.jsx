import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActiveFilterChips from "../components/strains/ActiveFilterChips";
import FeaturedStateQuickFilters from "../components/strains/FeaturedStateQuickFilters";
import MobileFilterDrawer from "../components/strains/MobileFilterDrawer";
import PaginationControls from "../components/strains/PaginationControls";
import ResultsSummaryBar from "../components/strains/ResultsSummaryBar";
import SelectedStateBanner from "../components/strains/SelectedStateBanner";
import StrainFilters from "../components/strains/StrainFilters";
import StrainGrid from "../components/strains/StrainGrid";
import StrainsPageSkeleton from "../components/strains/StrainsPageSkeleton";
import StrainSearchBar from "../components/strains/StrainSearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { useFilterMetadata } from "../hooks/useFilterMetadata";
import { useStrains } from "../hooks/useStrains";

const defaultFilters = {
  search: "",
  strain_type: "",
  state: "",
  effect: "",
  terpene: "",
  time_of_day: "",
  ordering: "name",
  page: 1,
};

function getFiltersFromSearchParams(searchParams) {
  return {
    search: searchParams.get("search") || "",
    strain_type: searchParams.get("strain_type") || "",
    state: searchParams.get("state") || "",
    effect: searchParams.get("effect") || "",
    terpene: searchParams.get("terpene") || "",
    time_of_day: searchParams.get("time_of_day") || "",
    ordering: searchParams.get("ordering") || "name",
    page: Number(searchParams.get("page") || 1),
  };
}

function buildSearchParams(filters) {
  const params = {};

  if (filters.search) params.search = filters.search;
  if (filters.strain_type) params.strain_type = filters.strain_type;
  if (filters.state) params.state = filters.state;
  if (filters.effect) params.effect = filters.effect;
  if (filters.terpene) params.terpene = filters.terpene;
  if (filters.time_of_day) params.time_of_day = filters.time_of_day;
  if (filters.ordering && filters.ordering !== "name") params.ordering = filters.ordering;
  if (filters.page && filters.page !== 1) params.page = String(filters.page);

  return params;
}

export default function StrainsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() =>
    getFiltersFromSearchParams(searchParams)
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: metadata, loading: metadataLoading, error: metadataError } =
    useFilterMetadata();

  const debouncedSearch = useDebounce(filters.search, 350);

  const queryFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch.trim(),
    }),
    [filters, debouncedSearch]
  );

  const { data, loading, error } = useStrains(queryFilters);

  useEffect(() => {
    const nextFilters = getFiltersFromSearchParams(searchParams);

    setFilters((prev) => {
      const prevSerialized = JSON.stringify(prev);
      const nextSerialized = JSON.stringify(nextFilters);
      return prevSerialized === nextSerialized ? prev : nextFilters;
    });
  }, [searchParams]);

  useEffect(() => {
    const params = buildSearchParams(queryFilters);
    setSearchParams(params, { replace: true });
  }, [queryFilters, setSearchParams]);

  function handleFilterChange(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  }

  function handleReset() {
    setFilters(defaultFilters);
    setSearchParams({}, { replace: true });
  }

  function handleRemoveFilter(key) {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "ordering" ? "name" : "",
      page: 1,
    }));
  }

  function handleNextPage() {
    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }

  function handlePreviousPage() {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  }

  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.strain_type) ||
    Boolean(filters.state) ||
    Boolean(filters.effect) ||
    Boolean(filters.terpene) ||
    Boolean(filters.time_of_day) ||
    (filters.ordering && filters.ordering !== "name");

  const featuredQuickStates = (metadata?.states || []).filter((state) =>
    ["deep-focus", "creative-flow", "cinematic-review", "idea-generation"].includes(
      state.slug
    )
  );

  const selectedState =
    metadata?.states?.find((item) => item.slug === filters.state) || null;

  if (metadataLoading && loading) {
    return <StrainsPageSkeleton />;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
          FlowTerp Explorer
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Discover Strains for Your Creative Process
        </h1>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Search and filter strains by creative state, effect, terpene profile,
          time of day, and type to find the right fit for coding, music production,
          editing, writing, or deep focus.
        </p>
      </div>

      {!metadataLoading && !metadataError && selectedState ? (
        <SelectedStateBanner
          state={selectedState}
          onClear={() => handleFilterChange("state", "")}
        />
      ) : null}

      <div className="mb-6 space-y-4">
        <StrainSearchBar
          value={filters.search}
          onChange={(value) => handleFilterChange("search", value)}
        />

        {!metadataLoading && !metadataError ? (
          <FeaturedStateQuickFilters
            states={featuredQuickStates}
            activeState={filters.state}
            onSelectState={(value) => handleFilterChange("state", value)}
          />
        ) : null}

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.07]"
          >
            Open Filters
          </button>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        metadata={metadata}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        loading={metadataLoading}
        error={metadataError}
      />

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="hidden lg:block">
          {metadataLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-400">
              Loading filters...
            </div>
          ) : metadataError ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
              {metadataError}
            </div>
          ) : (
            <StrainFilters
              metadata={metadata}
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          )}
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Available Strains</h2>
            <p className="text-sm text-zinc-400">
              {loading
                ? "Updating..."
                : `${data?.count ?? 0} result${data?.count === 1 ? "" : "s"}`}
            </p>
          </div>

          {!metadataLoading && !metadataError ? (
            <ActiveFilterChips
              filters={filters}
              metadata={metadata}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleReset}
            />
          ) : null}

          <ResultsSummaryBar
            filters={filters}
            metadata={metadata}
            count={data?.count ?? 0}
            loading={loading}
          />

          <StrainGrid
            strains={data?.results || []}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleReset}
          />

          {!loading && !error && (data?.next || data?.previous) ? (
            <PaginationControls
              currentPage={filters.page}
              hasPrevious={Boolean(data?.previous)}
              hasNext={Boolean(data?.next)}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}