import { useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useClientSession } from "../../context/ClientSessionContext";
import { ServiceButton } from "../../component/services/ServiceButton";

export function ServiceSelectPage() {
  const { services, loading, error } = useServices();
  const { join, loading: joining } = useClientSession();
  const navigate = useNavigate();

  const handleSelect = async (slug: string) => {
    try {
      const roomId = await join(slug);
      navigate(`/chat/${roomId}`);
    } catch {
      // error state already tracked in context
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-text-muted text-sm">
        Loading services
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-page px-4 py-12">
      <div className="w-full max-w-sm">
        <h1
          className="text-2xl font-bold text-text-primary mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          How can we help
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          Pick a service to start a conversation
        </p>

        <div className="flex flex-col gap-2">
          {services.map((service, index) => (
            <div
              key={service._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ServiceButton
                service={service}
                onSelect={handleSelect}
                disabled={joining}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}