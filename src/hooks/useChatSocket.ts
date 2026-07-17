import { useState, useEffect, useCallback } from "react";
import type { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "../sockets/socketEvents";
import type { Message, SendMessagePayload } from "../types/message";

// generic hook shared by both client and worker chat pages
// fetches history once per room, then the socket handles anything new
export function useChatSocket(
  socket: Socket | null,
  roomId: string | null,
  fetchHistory: (roomId: string) => Promise<Message[]>
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // loads past messages whenever the active room changes
  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    let cancelled = false;
    setHistoryLoading(true);

    fetchHistory(roomId)
      .then((history) => {
        if (!cancelled) {
          setMessages(history);
        }
      })
      .catch(() => {
        // history failing to load isn't fatal, live messages still work
        // just means older context is missing for this session
        if (!cancelled) {
          setMessages([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [roomId, fetchHistory]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);

    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE_NEW, handleNewMessage);
    };
  }, [socket, roomId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !roomId) return;

      const payload: SendMessagePayload = { roomId, content };
      socket.emit(SOCKET_EVENTS.MESSAGE_SEND, payload);
    },
    [socket, roomId]
  );

  return { messages, sendMessage, historyLoading };
}