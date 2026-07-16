import type { Message } from "../../types/message";

interface Props {
  message: Message;
  // which side is "me" in this chat, client page passes "client", worker page passes "worker"
  currentSenderType: "client" | "worker";
}

// aligns and colors a single message based on who sent it
export function MessageBubble({ message, currentSenderType }: Props) {
  const isMine = message.senderType === currentSenderType;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMine
            ? "bg-brand-blue text-brand-white"
            : "bg-brand-gold text-black"
        }`}
      >
        <p>{message.content}</p>
        <span className="block text-xs opacity-70 mt-1">
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}