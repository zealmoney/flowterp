import axios from "axios";

const api = axios.create({
  //baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://flowterpbackend.vercel.app/api/",
});

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("flowterp_access_token");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login/") &&
      !originalRequest.url?.includes("/auth/token/refresh/")
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("flowterp_refresh_token");

      if (!refresh) {
        localStorage.removeItem("flowterp_access_token");
        localStorage.removeItem("flowterp_refresh_token");
        localStorage.removeItem("flowterp_user");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          //"http://127.0.0.1:8000/api/auth/token/refresh/",
          "https://flowterpbackend.vercel.app/api/auth/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = response.data.access;
        localStorage.setItem("flowterp_access_token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("flowterp_access_token");
        localStorage.removeItem("flowterp_refresh_token");
        localStorage.removeItem("flowterp_user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;