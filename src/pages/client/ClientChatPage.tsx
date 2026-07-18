import { useParams } from "react-router-dom";
import { useClientSession } from "../../context/ClientSessionContext";
import { ChatHeader } from "../../component/chats/ChatHeader";
import { MessageList } from "../../component/chats/MessageList";
import { MessageInput } from "../../component/chats/MessageInput";

export function ClientChatPage() {
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();
  const { roomId: sessionRoomId, messages, sendMessage } = useClientSession();

  if (!sessionRoomId) {
    return (
      <div className="flex items-center justify-center h-screen text-text-muted text-sm">
        Loading chat
      </div>
    );
  }

  if (urlRoomId !== sessionRoomId) {
    return (
      <div className="flex items-center justify-center h-screen text-text-muted text-sm">
        This chat is no longer active
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader title="Support" subtitle="Usually replies shortly" initial="S" />
      <MessageList messages={messages} currentSenderType="client" />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}