import type { Worker } from "../types/worker"

const CLIENT_TOKEN_KEY = "chatToken";
const CLIENT_ROOM_ID_KEY = "chatRoomId";
const WORKER_TOKEN_KEY = "workerToken";
const WORKER_PROFILE_KEY = "workerProfile";


// client side, token and room id
export function getClientToken(): string | null {
  return localStorage.getItem(CLIENT_TOKEN_KEY);
}

export function setClientToken(token: string): void {
  localStorage.setItem(CLIENT_TOKEN_KEY, token);
}

export function getClientRoomId(): string | null {
  return localStorage.getItem(CLIENT_ROOM_ID_KEY);
}

export function setClientRoomId(roomId: string): void {
  localStorage.setItem(CLIENT_ROOM_ID_KEY, roomId);
}

export function clearClientSession(): void {
  localStorage.removeItem(CLIENT_TOKEN_KEY);
  localStorage.removeItem(CLIENT_ROOM_ID_KEY);
}

// worker side, just the access token
// refreshToken is httpOnly so i never store or touch it here
export function getWorkerToken(): string | null {
  return localStorage.getItem(WORKER_TOKEN_KEY);
}

export function setWorkerToken(token: string): void {
  localStorage.setItem(WORKER_TOKEN_KEY, token);
}

export function clearWorkerSession(): void {
  localStorage.removeItem(WORKER_TOKEN_KEY);
  localStorage.removeItem(WORKER_PROFILE_KEY);

}

export function getWorkerProfile(): Worker | null {
  const raw = localStorage.getItem(WORKER_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Worker;
  } catch {
    // corrupted or old data shape, treat as no profile
    return null;
  }
}

export function setWorkerProfile(worker: Worker): void {
  localStorage.setItem(WORKER_PROFILE_KEY, JSON.stringify(worker));
}