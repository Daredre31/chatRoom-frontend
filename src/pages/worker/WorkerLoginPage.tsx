import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkerSession } from "../../context/WorkerAuthContext";

export function WorkerLoginPage() {
  const { login, loading, error } = useWorkerSession();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/worker/dashboard");
    } catch {
      // error already tracked in context, stay on the page
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm p-6 border rounded-lg"
      >
        <h1 className="text-lg font-semibold text-brand-blue">
          Worker login
        </h1>

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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-brand-blue text-brand-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Logging in" : "Log in"}
        </button>
      </form>
    </div>
  );
}