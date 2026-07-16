import { useState, useEffect } from "react";
import { getServices } from "../api/clientApi";
import type { Service } from "../types/service";

// fetches the service list once on mount, used to render service buttons
// and to populate the service dropdown on worker signup
export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchServices() {
      try {
        const result = await getServices();
        if (!cancelled) {
          setServices(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not load services, please refresh");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, []);

  return { services, loading, error };
}