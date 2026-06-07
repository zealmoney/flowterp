import api from "./client";

export async function registerUser(payload) {
  const response = await api.post("/auth/register/", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post("/auth/login/", payload);
  return response.data;
}

export async function fetchMe() {
  const response = await api.get("/auth/me/");
  return response.data;
}

export async function updateMe(payload) {
  const response = await api.patch("/auth/me/", payload);
  return response.data;
}