import api from "./client";

export async function getStrains(params) {
  const response = await api.get("/strains/", { params });
  return response.data;
}

export async function getStrainDetail(slug) {
  const response = await api.get(`/strains/${slug}/`);
  return response.data;
}