import { useState, useEffect, useCallback } from "react";
import type { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../sockets/socketEvents";
import type { Message, SendMessagePayload } from "../types/message";

// generic hook shared by both client and worker chat pages
// takes an already connected socket and the active roomId
export function useChatSocket(socket: Socket | null, roomId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      // only append if it belongs to the room currently open
      // guards against messages arriving for a different room in the same session
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);
    };
  }, [socket, roomId]);

  // resets messages when switching rooms, so old room's messages don't linger
  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !roomId) return;

      const payload: SendMessagePayload = { roomId, content };
      socket.emit(SOCKET_EVENTS.MESSAGE_SEND, payload);
    },
    [socket, roomId]
  );

  return { messages, sendMessage };
}