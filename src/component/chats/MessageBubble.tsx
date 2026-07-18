import type { Message } from "../../types/message";

interface Props {
  message: Message;
  currentSenderType: "client" | "worker";
}

export function MessageBubble({ message, currentSenderType }: Props) {
  const isMine = message.senderType === currentSenderType;

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"} mb-1.5 animate-fade-in-up`}
    >
      <div
        className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
          isMine
            ? "bg-teal text-white rounded-2xl rounded-br-md"
            : "bg-bg-card border border-border-soft text-text-primary rounded-2xl rounded-bl-md"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <span
          className={`block text-[10px] mt-1 ${
            isMine ? "text-teal-light" : "text-text-muted"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}