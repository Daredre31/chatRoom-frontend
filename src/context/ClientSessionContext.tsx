import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { useClientRoom } from "../hooks/useClientRoom";
import { useChatSocket } from "../hooks/useChatSocket";
import {
  connectClientSocket,
  disconnectClientSocket,
} from "../sockets/socketClient";
import { getClientToken } from "../utils/storage";
import type { Message } from "../types/message";

interface ClientSessionContextValue {
  roomId: string | null;
  loading: boolean;
  error: string | null;
  join: (serviceSlug: string) => Promise<void>;
  messages: Message[];
  sendMessage: (content: string) => void;
}

const ClientSessionContext = createContext <ClientSessionContextValue | undefined>(undefined);

export function ClientSessionProvider({ children }: { children: ReactNode }) {
  const { roomId, loading, error, join: joinRoom } = useClientRoom();
  const [socket, setSocket] = useState<Socket | null>(null);

  // connects whenever a token exists, whether restored from a past visit
  // or set moments ago after a fresh join
  useEffect(() => {
    const token = getClientToken();
    if (!token) return;

    const newSocket = connectClientSocket();
    setSocket(newSocket);

    return () => {
      disconnectClientSocket();
      setSocket(null);
    };
  }, [roomId]);

  const { messages, sendMessage } = useChatSocket(socket, roomId);

  const join = useCallback(
    async (serviceSlug: string) => {
      await joinRoom(serviceSlug);
    },
    [joinRoom]
  );

  return (
    <ClientSessionContext.Provider
      value={{ roomId, loading, error, join, messages, sendMessage }}
    >
      {children}
    </ClientSessionContext.Provider>
  );
}

// small hook so components just call this instead of useContext directly
export function useClientSession() {
  const ctx = useContext(ClientSessionContext);
  if (!ctx) {
    throw new Error("useClientSession must be used within a ClientSessionProvider");
  }
  return ctx;
}