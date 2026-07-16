import { useState, useCallback } from "react";
import { registerWorker } from "../api/workerApi";
import type { WorkerRegisterPayload, Worker } from "../types/worker";

// handles worker signup, does not log the worker in
// they get redirected to login afterward
export function useWorkerRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (payload: WorkerRegisterPayload): Promise<Worker> => {
      setLoading(true);
      setError(null);

      try {
        const result = await registerWorker(payload);
        return result.worker;
      } catch (err) {
        setError("Could not register, email or service may already be taken");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { register, loading, error };
}