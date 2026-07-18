import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useWorkerRegister } from "../../hooks/useWorkerRegister";
import { AuthLayout } from "../../component/layout/AuthLayout";

export function WorkerRegisterPage() {
  const { services, loading: servicesLoading } = useServices();
  const { register, loading, error } = useWorkerRegister();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceId, setServiceId] = useState("");

  // hide services already claimed by another worker, avoids a confusing
  // 409 after the fact for something the dropdown could have prevented
  const availableServices = services.filter((s) => !s.workerId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await register({ name, email, password, serviceId });
      navigate("/worker/login");
    } catch {
      // error already tracked by the hook
    }
  };

  return (
    <AuthLayout eyebrow="Worker access" title="Join as the person behind a service">
      <h2
        className="text-xl font-bold text-text-primary mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Create account
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Pick the service you'll be responding to
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Jane Doe"
            className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-text-secondary">
            Service
          </label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            disabled={servicesLoading}
            className="bg-bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
          >
            <option value="" disabled>
              {servicesLoading ? "Loading services" : "Select a service"}
            </option>
            {availableServices.map((service) => (
              <option key={service._id} value={service._id}>
                {service.serviceName}
              </option>
            ))}
          </select>
          {!servicesLoading && availableServices.length === 0 && (
            <p className="text-xs text-text-muted">
              No services available right now, check back later
            </p>
          )}
        </div>

        {error && (
          <p className="text-red text-xs bg-red-bg border border-red-border rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || availableServices.length === 0}
          className="bg-teal hover:bg-teal-hover text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? "Creating account" : "Sign up"}
        </button>
      </form>

      <p className="text-xs text-text-secondary text-center mt-6">
        Already have an account?{" "}
        <Link to="/worker/login" className="text-teal font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}