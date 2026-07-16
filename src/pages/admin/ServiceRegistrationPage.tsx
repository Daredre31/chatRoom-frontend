import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateService } from "../../hooks/useCreateService";

// simple form to register a new service, no auth on this yet
// will move behind admin role auth later
export function ServiceRegistrationPage() {
  const [serviceName, setServiceName] = useState("");
  const [slug, setSlug] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { create, loading, error } = useCreateService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    try {
      const service = await create({ serviceName, slug });
      setSuccessMessage(`Service "${service.serviceName}" created`);
      setServiceName("");
      setSlug("");
    } catch {
      // error already tracked by the hook, nothing extra to do here
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm p-6 border rounded-lg"
      >
        <h1 className="text-lg font-semibold text-brand-blue">
          Register a service
        </h1>

        <input
          type="text"
          placeholder="Service name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-brand-blue text-brand-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Creating" : "Create service"}
        </button>
      </form>
    </div>
  );
}