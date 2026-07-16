import axios from "axios";

// coming from .env file
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is missing, check your .env file");
}

// factory so client and worker can each get their own isolated instance
// interceptors get attached separately, this file just builds the raw instance
export function createApiClient() {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    // needed so the httpOnly refreshToken cookie actually gets sent/received
    withCredentials: true,
  });
}