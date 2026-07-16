import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWorkerSession } from "../../context/WorkerAuthContext";
import { MessageList } from "../../component/chats/MessageList";
import { MessageInput } from "../../component/chats/MessageInput";

// roomId now comes straight from the url, not a prop
// this way refreshing mid chat keeps the worker on the same room
export function WorkerChatPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { activeRoomId, openRoom, messages, sendMessage } = useWorkerSession();

  useEffect(() => {
    if (roomId) {
      openRoom(roomId);
    }
  }, [roomId, openRoom]);

  if (!roomId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        No room selected
      </div>
    );
  }

  const isActive = activeRoomId === roomId;

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-brand-blue text-brand-white p-4 text-sm font-medium">
        Room {roomId}
      </header>

      <MessageList messages={messages} currentSenderType="worker" />
      <MessageInput onSend={sendMessage} disabled={!isActive} />
    </div>
  );
}