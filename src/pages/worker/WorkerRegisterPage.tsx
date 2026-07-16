import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import { useWorkerRegister } from "../../hooks/useWorkerRegister";

// worker signup form, service dropdown is populated from the same
// services list the client side uses, submitting maps name to serviceId
export function WorkerRegisterPage() {
  const { services, loading: servicesLoading } = useServices();
  const { register, loading, error } = useWorkerRegister();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceId, setServiceId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await register({ name, email, password, serviceId });
      navigate("/worker/login");
    } catch {
      // error already tracked by the hook, stay on the page
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm p-6 border rounded-lg"
      >
        <h1 className="text-lg font-semibold text-brand-blue">
          Worker sign up
        </h1>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />

        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
          disabled={servicesLoading}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        >
          <option value="" disabled>
            {servicesLoading ? "Loading services" : "Select a service"}
          </option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.serviceName}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-brand-blue text-brand-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Creating account" : "Sign up"}
        </button>
      </form>
    </div>
  );
}