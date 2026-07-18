import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWorkerSession } from "../../context/WorkerAuthContext";
import { ChatHeader } from "../../component/chats/ChatHeader";
import { MessageList } from "../../component/chats/MessageList";
import { MessageInput } from "../../component/chats/MessageInput";

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
      <div className="flex items-center justify-center h-screen text-text-muted text-sm">
        No room selected
      </div>
    );
  }

  const isActive = activeRoomId === roomId;

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader title="Client" subtitle={`Room ${roomId.slice(-6)}`} initial="C" />
      <MessageList messages={messages} currentSenderType="worker" loading={!isActive} />
      <MessageInput onSend={sendMessage} disabled={!isActive} />
    </div>
  );
}