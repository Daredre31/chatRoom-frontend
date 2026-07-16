import { useClientSession } from "../../context/ClientSessionContext";
import { MessageList } from "../../component/chats/MessageList";
import { MessageInput } from "../../component/chats/MessageInput";

// this page assumes a room has already been joined before landing here
// ServiceSelectPage is responsible for calling join before navigating over
export function ClientChatPage() {
  const { roomId, messages, sendMessage } = useClientSession();

  if (!roomId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        No active chat, please pick a service first
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