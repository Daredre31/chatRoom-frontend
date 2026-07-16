import { useState, useCallback } from "react";
import { joinRoom } from "../api/clientApi";
import {
  getClientToken,
  setClientToken,
  getClientRoomId,
  setClientRoomId,
} from "../utils/storage";

// handles joining a room and keeping the token/roomId in sync with storage
export function useClientRoom() {
  const [roomId, setRoomId] = useState<string | null>(getClientRoomId());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // call this the moment a client clicks a service button
  const join = useCallback(async (serviceSlug: string) => {
    setLoading(true);
    setError(null);

    try {
      const existingToken = getClientToken() ?? undefined;
      const result = await joinRoom(serviceSlug, existingToken);

      setClientToken(result.token);
      setClientRoomId(result.roomId);
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