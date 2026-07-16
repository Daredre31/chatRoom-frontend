import { useState, useCallback } from "react";
import { loginWorker } from "../api/workerApi";
import {
  setWorkerToken,
  setWorkerProfile,
  getWorkerProfile,
  clearWorkerSession,
} from "../utils/storage";
import type { Worker, WorkerLoginPayload } from "../types/worker";

// handles worker login, logout, and keeping worker profile in state
// profile is restored from storage on load so a refresh doesn't lose it
export function useWorkerAuth() {
  const [worker, setWorker] = useState<Worker | null>(getWorkerProfile());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: WorkerLoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const result = await loginWorker(payload);

      setWorkerToken(result.token);
      setWorkerProfile(result.worker);
      setWorker(result.worker);

      return result;
    } catch (err) {
      setError("Invalid email or password");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearWorkerSession();
    setWorker(null);
  }, []);

  return { worker, loading, error, login, logout };
}