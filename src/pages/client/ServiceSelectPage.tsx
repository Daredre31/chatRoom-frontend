import { useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useClientSession } from "../../context/ClientSessionContext";
import { ServiceButton } from "../../component/services/ServiceButton";

// entry point of the whole client flow, clicking a service joins a room
// and takes the client straight into the chat
export function ServiceSelectPage() {
  const { services, loading, error } = useServices();
  const { join, loading: joining } = useClientSession();
  const navigate = useNavigate();

  const handleSelect = async (slug: string) => {
    try {
      await join(slug);
      navigate("/chat");
    } catch {
      // error state is already tracked in context, nothing extra to do here
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading services
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-4 px-4">
      <h1 className="text-xl font-semibold text-brand-blue mb-2">
        What can we help you with
      </h1>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {services.map((service) => (
          <ServiceButton
            key={service._id}
            service={service}
            onSelect={handleSelect}
            disabled={joining}
          />
        ))}
      </div>
    </div>
  );
}