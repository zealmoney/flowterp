import api from "./client";

export const getHomepageData = async () => {
  const response = await api.get("/recommendations/homepage/");
  return response.data;
};

export const getFilterMetadata = async () => {
  const response = await api.get("/recommendations/filters/");
  return response.data;
};

export const getRecommendations = async (params) => {
  const response = await api.get("/recommendations/", { params });
  return response.data;
};