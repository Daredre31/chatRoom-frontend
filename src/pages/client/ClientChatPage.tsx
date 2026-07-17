import { useParams } from "react-router-dom";
import { useClientSession } from "../../context/ClientSessionContext";
import { MessageList } from "../../component/chats/MessageList";
import { MessageInput } from "../../component/chats/MessageInput";

// roomId comes from the url now, so each room has its own address
// and two tabs/services can never bleed into each other
export function ClientChatPage() {
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();
  const { roomId: sessionRoomId, messages, sendMessage } = useClientSession();

  // session hasn't caught up yet (e.g. straight refresh), show a light loading state
  if (!sessionRoomId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading chat
      </div>
    );
  }

  // url points at a different room than the one actually stored, don't show it
  if (urlRoomId !== sessionRoomId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        This chat is no longer active
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-brand-blue text-brand-white p-4 text-sm font-medium">
        Chat with support
      </header>

      <MessageList messages={messages} currentSenderType="client" />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}