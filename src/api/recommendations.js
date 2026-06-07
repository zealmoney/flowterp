import api from "./client";
import qs from "qs";

export async function getHomepageData() {
  const response = await api.get("/recommendations/homepage/");
  return response.data;
}

export async function getFilterMetadata() {
  const response = await api.get("/recommendations/filters/");
  return response.data;
}

export async function getRecommendations(params) {
  const response = await api.get("/recommendations/", {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
}