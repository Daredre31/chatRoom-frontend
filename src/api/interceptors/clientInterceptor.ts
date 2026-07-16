import type { AxiosInstance } from "axios";
import { getClientToken } from "../../utils/storage";

// attaches the client token to every outgoing request, if one exists
// no refresh logic here, client rooms stay open, token never expires
export function attachClientInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    const token = getClientToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}