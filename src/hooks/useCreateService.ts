import { useState, useCallback } from "react";
import { createService } from "../api/serviceApi";
import type { CreateServicePayload, Service } from "../types/service";

// handles creating a new service, used by the service registration page
export function useCreateService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (payload: CreateServicePayload): Promise<Service> => {
      setLoading(true);
      setError(null);

      try {
        const service = await createService(payload);
        return service;
      } catch (err) {
        setError("Could not create service, slug may already be taken");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { create, loading, error };
}