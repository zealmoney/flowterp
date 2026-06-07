const STORAGE_KEY = "flowterp_recent_flows";
const MAX_RECENT_FLOWS = 6;

function normalizeFilters(filters = {}) {
  return Object.keys(filters)
    .sort()
    .reduce((acc, key) => {
      const value = filters[key];

      if (
        value === "" ||
        value === null ||
        value === undefined ||
        value === false
      ) {
        return acc;
      }

      acc[key] = value;
      return acc;
    }, {});
}

function getFlowSignature(filters = {}) {
  return JSON.stringify(normalizeFilters(filters));
}

export function getGuestRecentFlows() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveGuestRecentFlow(flow) {
  try {
    const existing = getGuestRecentFlows();
    const incomingSignature = getFlowSignature(flow.filters_json);

    const filtered = existing.filter((item) => {
      return getFlowSignature(item.filters_json) !== incomingSignature;
    });

    const next = [
      {
        ...flow,
        filters_json: normalizeFilters(flow.filters_json),
        id: `guest-${Date.now()}`,
        last_used_at: new Date().toISOString(),
      },
      ...filtered,
    ].slice(0, MAX_RECENT_FLOWS);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

export function deleteGuestRecentFlow(id) {
  try {
    const existing = getGuestRecentFlows();
    const next = existing.filter((item) => item.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}