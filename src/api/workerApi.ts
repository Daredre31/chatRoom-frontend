import { createApiClient } from "./axiosClient";
import { attachWorkerInterceptor } from "./interceptors/workerInterceptor";
import type { ApiResponse } from "../types/api";
import type { Room } from "../types/room";
import type {
  WorkerLoginPayload,
  WorkerLoginResponse,
  WorkerRegisterPayload,
  WorkerRegisterResponse,
} from "../types/worker";

const client = createApiClient();
attachWorkerInterceptor(client);

export async function loginWorker(
  payload: WorkerLoginPayload
): Promise<WorkerLoginResponse> {
  const response = await client.post<ApiResponse<WorkerLoginResponse>>(
    "/api/worker/login",
    payload
  );
  return response.data.data;
}

// no token comes back here, worker has to log in separately after this
export async function registerWorker(
  payload: WorkerRegisterPayload
): Promise<WorkerRegisterResponse> {
  const response = await client.post<ApiResponse<WorkerRegisterResponse>>(
    "/api/worker/signup",
    payload
  );
  return response.data.data;
}

export async function getMyRooms(): Promise<Room[]> {
  const response = await client.get<ApiResponse<{ rooms: Room[] }>>(
    "/api/room/mine"
  );
  return response.data.data.rooms;
}