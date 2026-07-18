import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWorkerSession } from "../../context/WorkerAuthContext";
import { AuthLayout } from "../../component/layout/AuthLayout";

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
      // error already tracked in context
    }
  };

  return (
    <AuthLayout eyebrow="Worker access" title="Welcome back, log in to your dashboard">
      <h2
        className="text-xl font-bold text-text-primary mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Log in
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Enter your details to view your rooms
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        {error && (
          <p className="text-red text-xs bg-red-bg border border-red-border rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-teal hover:bg-teal-hover text-white py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? "Logging in" : "Log in"}
        </button>
      </form>

      <p className="text-xs text-text-secondary text-center mt-6">
        Don't have an account?{" "}
        <Link to="/worker/register" className="text-teal font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}