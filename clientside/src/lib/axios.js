import axios from "axios"


const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, tokenRefreshed) => {
  failedQueue.forEach(prom => {
    tokenRefreshed ? prom.resolve() : prom.reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh");
        console.log("GOT refresh token")
        processQueue(null, true);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, false);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const checkAuth = async () => {
    try {
        const res = await api.get("/api/auth/me");
        return res.data.user
    } catch {
        return null
    }
}

export default api;