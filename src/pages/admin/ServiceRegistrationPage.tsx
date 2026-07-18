import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateService } from "../../hooks/useCreateService";

export function ServiceRegistrationPage() {
  const [serviceName, setServiceName] = useState("");
  const [slug, setSlug] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { create, loading, error } = useCreateService();

  // keeps the slug in sync with the name as you type, still editable by hand after
  const handleNameChange = (value: string) => {
    setServiceName(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    try {
      const service = await create({ serviceName, slug });
      setSuccessMessage(`"${service.serviceName}" is live`);
      setServiceName("");
      setSlug("");
    } catch {
      // error already tracked by the hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page px-6 py-12">
      <div className="w-full max-w-sm animate-fade-in-up">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-2">
          Admin
        </p>
        <h1
          className="text-2xl font-bold text-text-primary mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Register a service
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          This becomes a button clients can select
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-bg-card border border-border-soft rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary">
              Service name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="Cyber Security"
              className="bg-bg-page border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="cyber-security"
              className="bg-bg-page border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors font-mono"
            />
            <p className="text-xs text-text-muted">
              Auto-generated from the name, edit if needed
            </p>
          </div>

          {error && (
            <p className="text-red text-xs bg-red-bg border border-red-border rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green text-xs bg-green-bg border border-green-border rounded-lg px-3 py-2">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-teal hover:bg-teal-hover text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Creating" : "Create service"}
          </button>
        </form>
      </div>
    </div>
  );
}