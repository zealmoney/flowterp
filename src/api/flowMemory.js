import api from "./client";

export async function getFlowMemory() {
  const response = await api.get("/me/flow-memory/");
  return response.data;
}