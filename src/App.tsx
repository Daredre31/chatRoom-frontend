import { Routes, Route, Outlet } from "react-router-dom";
import { ClientSessionProvider } from "./context/ClientSessionContext";
import { WorkerAuthProvider } from "./context/WorkerAuthContext";

import { ServiceSelectPage } from "./pages/client/ServiceSelectPage";
import { ClientChatPage } from "./pages/client/ClientChatPage";

import { WorkerRegisterPage } from "./pages/worker/WorkerRegisterPage";
import { WorkerLoginPage } from "./pages/worker/WorkerLoginPage";
import { WorkerDashboardPage } from "./pages/worker/WorkerDashboardPage";
import { WorkerChatPage } from "./pages/worker/WorkerChatPage";

import { ServiceRegistrationPage } from "./pages/admin/ServiceRegistrationPage";

export default function App() {
  return (
    <Routes>
      {/* client side */}
      <Route
        path="/"
        element={
          <ClientSessionProvider>
            <ServiceSelectPage />
          </ClientSessionProvider>
        }
      />
      <Route
        path="/chat/:roomId"
        element={
          <ClientSessionProvider>
            <ClientChatPage />
          </ClientSessionProvider>
        }
      />

      {/* worker side, one shared provider for the whole section */}
      <Route
        path="/worker"
        element={
          <WorkerAuthProvider>
            <Outlet />
          </WorkerAuthProvider>
        }
      >
        <Route path="register" element={<WorkerRegisterPage />} />
        <Route path="login" element={<WorkerLoginPage />} />
        <Route path="dashboard" element={<WorkerDashboardPage />} />
        <Route path="rooms/:roomId" element={<WorkerChatPage />} />
      </Route>

      {/* temporary, no auth on this yet */}
      <Route path="/admin/services/new" element={<ServiceRegistrationPage />} />
    </Routes>
  );
}