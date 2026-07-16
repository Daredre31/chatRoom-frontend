import axios from "axios";
import type { AxiosInstance } from "axios";
import { getWorkerToken, setWorkerToken, clearWorkerSession } from "../../utils/storage";

// attaches worker token to every request, and handles the
// 401 expired token case by refreshing once and retrying the original call
export function attachWorkerInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    const token = getWorkerToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // only try refresh once per request, avoid infinite retry loops
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL;

          // separate raw call here, not using the same instance
          // to avoid this request getting caught in its own interceptor
          const refreshResponse = await axios.post(
            `${baseURL}api/refresh`,
            {},
            { withCredentials: true }
          );

          const newToken = refreshResponse.data.data.token;
          setWorkerToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // refresh itself failed, session is really over, clear and bail
          clearWorkerSession();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}