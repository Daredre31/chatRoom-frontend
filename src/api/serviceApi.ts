import { createApiClient } from "./axiosClient";
import type { ApiResponse } from "../types/api";
import type { Service, CreateServicePayload } from "../types/service";

// no interceptor attached here, this route has no auth middleware on it
const client = createApiClient();

export async function createService(
  payload: CreateServicePayload
): Promise<Service> {
  const response = await client.post<ApiResponse<{ servicecreate: Service }>>(
    "/api/create/service",
    payload
  );
  return response.data.data.servicecreate;
}