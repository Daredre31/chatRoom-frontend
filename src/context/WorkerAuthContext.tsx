import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Socket } from "socket.io-client";
import { useWorkerAuth } from "../hooks/useWorkerAuth";
import { useChatSocket } from "../hooks/useChatSocket";
import {
  connectWorkerSocket,
  disconnectWorkerSocket,
  joinWorkerRoom,
} from "../sockets/socketWorker";
import { getWorkerToken } from "../utils/storage";
import type { Worker, WorkerLoginPayload } from "../types/worker";
import type { Message } from "../types/message";
import { getRoomMessages } from "../api/workerApi";

interface WorkerAuthContextValue {
  worker: Worker | null;
  loading: boolean;
  error: string | null;
  login: (payload: WorkerLoginPayload) => Promise<void>;
  logout: () => void;
  activeRoomId: string | null;
  openRoom: (roomId: string) => void;
  messages: Message[];
  sendMessage: (content: string) => void;
}

const WorkerAuthContext = createContext<WorkerAuthContextValue | undefined>(
  undefined
);

export function WorkerAuthProvider({ children }: { children: ReactNode }) {
  // aliased here so they don't clash with this file's own login/logout
  const {
    worker,
    loading,
    error,
    login: loginWorker,
    logout: logoutWorker,
  } = useWorkerAuth();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // connects once a worker token exists, disconnects on logout
  useEffect(() => {
    const token = getWorkerToken();
    if (!token) return;

    const newSocket = connectWorkerSocket();
    setSocket(newSocket);

    return () => {
      disconnectWorkerSocket();
      setSocket(null);
    };
  }, [worker]);

  const { messages, sendMessage } = useChatSocket(socket, activeRoomId , getRoomMessages);

  // called from the dashboard whenever the worker opens a specific room
  const openRoom = useCallback((roomId: string) => {
    setActiveRoomId(roomId);
    joinWorkerRoom(roomId);
  }, []);

  const login = useCallback(
    async (payload: WorkerLoginPayload) => {
      await loginWorker(payload);
    },
    [loginWorker]
  );

  const logout = useCallback(() => {
    logoutWorker();
    setActiveRoomId(null);
  }, [logoutWorker]);

  return (
    <WorkerAuthContext.Provider
      value={{
        worker,
        loading,
        error,
        login,
        logout,
        activeRoomId,
        openRoom,
        messages,
        sendMessage,
      }}
    >
      {children}
    </WorkerAuthContext.Provider>
  );
}

export function useWorkerSession() {
  const ctx = useContext(WorkerAuthContext);
  if (!ctx) {
    throw new Error("useWorkerSession must be used within a WorkerAuthProvider");
  }
  return ctx;
}