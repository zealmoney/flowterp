import api from "./client";

export async function getRecentFlows() {
  const response = await api.get("/recent-flows/");
  return response.data;
}

export async function trackRecentFlow(payload) {
  const response = await api.post("/recent-flows/track/", payload);
  return response.data;
}

export async function deleteRecentFlow(id) {
  const response = await api.delete(`/recent-flows/${id}/`);
  return response.data;
}