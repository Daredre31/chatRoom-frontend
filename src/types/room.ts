export type RoomStatus = "open" | "closed";

export interface JoinRoomResponse {
  roomId: string;
  token: string;
}

export interface Room {
  _id: string;
  serviceId: string;
  workerId: string;
  clientSessionId: string;
  status: RoomStatus;
  lastMessageAt: string;
}