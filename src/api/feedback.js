import api from "./client";

export async function createFeedback(payload) {
  const response = await api.post("/feedback/", payload);
  return response.data;
}

export async function getMyFeedback(params = {}) {
  const response = await api.get("/feedback/", { params });
  return response.data;
}

export async function updateFeedback(id, payload) {
  const response = await api.patch(`/feedback/${id}/`, payload);
  return response.data;
}