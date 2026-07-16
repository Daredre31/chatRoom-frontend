import { io, Socket } from "socket.io-client";
import { getWorkerToken } from "../utils/storage";
import { SOCKET_EVENTS } from "./socketEvents";

let socket: Socket | null = null;

// creates and connects the worker socket, using the saved worker token
// worker sockets must explicitly join whichever room the worker opens , i mean worker join the room manually
export function connectWorkerSocket(): Socket {
  const token = getWorkerToken();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  socket = io(baseURL, {
    auth: { token },
  });

  return socket;
}

export function getWorkerSocket(): Socket | null {
  return socket;
}

// call this whenever the worker opens a specific room in the dashboard
export function joinWorkerRoom(roomId: string): void {
  socket?.emit(SOCKET_EVENTS.ROOM_JOIN, roomId);
}

export function disconnectWorkerSocket(): void {
  socket?.disconnect();
  socket = null;
}