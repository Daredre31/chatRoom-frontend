import { io, Socket } from "socket.io-client";
import { getClientToken } from "../utils/storage";

let socket: Socket | null = null;

// creates and connects the client socket, using the saved client token
// client sockets auto join their room, nothing else needed after connecting
export function connectClientSocket(): Socket {
  const token = getClientToken();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  socket = io(baseURL, {
    auth: { token },
  });

  return socket;
}

export function getClientSocket(): Socket | null {
  return socket;
}

// disconnects and clears out the socket, used when leaving the chat page
export function disconnectClientSocket(): void {
  socket?.disconnect();
  socket = null;
}