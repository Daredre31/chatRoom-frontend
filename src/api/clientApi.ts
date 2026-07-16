import { createApiClient } from "./axiosClient";
import { attachClientInterceptor } from "./interceptors/clientInterceptor";
import type { ApiResponse } from "../types/api";
import type { Service } from "../types/service";
import type { JoinRoomResponse } from "../types/room";

const client = createApiClient();
attachClientInterceptor(client);

// backend returns the array directly as data, not wrapped in { services }
export async function getServices(): Promise<Service[]> {
  const response = await client.get<ApiResponse<Service[]>>(
    "/api/service/allservice"
  );
  return response.data.data;
}

export async function joinRoom(
  serviceSlug: string,
  existingToken?: string
): Promise<JoinRoomResponse> {
  const response = await client.post<ApiResponse<JoinRoomResponse>>(
    "/api/join/room",
    { serviceSlug, existingToken }
  );
  return response.data.data;
}