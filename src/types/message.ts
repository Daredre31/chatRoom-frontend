// tells us which side sent the message, used to align chat bubbles
export type SenderType = "client" | "worker";

// a single chat message, same shape whether it comes from client or worker
export interface Message {
  _id: string;
  roomId: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
}

// what we send up the socket when sending a message
export interface SendMessagePayload {
  roomId: string;
  content: string;
}