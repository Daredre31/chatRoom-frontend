import { useState, useEffect, useCallback } from "react";
import { getMyRooms } from "../api/workerApi";
import type { Room } from "../types/room";

// fetches the worker's open rooms, used on the dashboard
// exposes a refetch so the page can refresh the list after actions
export function useWorkerRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getMyRooms();
      setRooms(result);
    } catch (err) {
      setError("Could not load rooms, please refresh");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, loading, error, refetch: fetchRooms };
}