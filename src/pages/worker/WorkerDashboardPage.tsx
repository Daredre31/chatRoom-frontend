import { useNavigate } from "react-router-dom";
import { useWorkerRooms } from "../../hooks/useWorkerRooms";
import { useWorkerSession } from "../../context/WorkerAuthContext";

// lists the worker's open rooms, clicking one navigates into that chat
// this is the manual join step described in the flow, nothing auto opens
export function WorkerDashboardPage() {
  const { rooms, loading, error } = useWorkerRooms();
  const { worker, logout } = useWorkerSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/worker/login");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-brand-blue text-brand-white p-4 flex items-center justify-between">
        <span className="text-sm font-medium">
          {worker ? `Welcome, ${worker.name}` : "Dashboard"}
        </span>
        <button onClick={handleLogout} className="text-xs underline">
          Log out
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {loading && <p className="text-gray-400 text-sm">Loading rooms</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!loading && !error && rooms.length === 0 && (
          <p className="text-gray-400 text-sm">No open rooms right now</p>
        )}

        <div className="flex flex-col gap-2">
          {rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => navigate(`/worker/rooms/${room._id}`)}
              className="text-left border rounded-lg p-3 hover:bg-gray-50"
            >
              <p className="text-sm font-medium">Room {room._id}</p>
              <p className="text-xs text-gray-400">
                Last activity {new Date(room.lastMessageAt).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}