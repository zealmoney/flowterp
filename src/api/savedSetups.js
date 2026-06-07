import api from "./client";

export async function getSavedSetups() {
  const response = await api.get("/saved-setups/");
  return response.data;
}

export async function createSavedSetup(payload) {
  const response = await api.post("/saved-setups/", payload);
  return response.data;
}

export async function updateSavedSetup(id, payload) {
  const response = await api.patch(`/saved-setups/${id}/`, payload);
  return response.data;
}

export async function deleteSavedSetup(id) {
  const response = await api.delete(`/saved-setups/${id}/`);
  return response.data;
}