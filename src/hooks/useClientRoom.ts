import { useState, useCallback } from "react";
import { joinRoom } from "../api/clientApi";
import {
  getClientToken,
  setClientToken,
  getClientRoomId,
  setClientRoomId,
  getClientServiceSlug,
  setClientServiceSlug,
} from "../utils/storage";

export function useClientRoom() {
  const [roomId, setRoomId] = useState<string | null>(getClientRoomId());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = useCallback(async (serviceSlug: string) => {
    setLoading(true);
    setError(null);

    try {
      const savedSlug = getClientServiceSlug();
      const savedToken = getClientToken();

      const existingToken =
        savedSlug === serviceSlug ? savedToken ?? undefined : undefined;

      const result = await joinRoom(serviceSlug, existingToken);

      setClientToken(result.token);
      setClientRoomId(result.roomId);
      setClientServiceSlug(serviceSlug);
      setRoomId(result.roomId);

      return result;
    } catch (err) {
      setError("Could not join room, please try again");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { roomId, loading, error, join };
}