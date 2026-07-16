import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "../../types/message";

interface Props {
  messages: Message[];
  currentSenderType: "client" | "worker";
}

// scrolls to the bottom automatically whenever a new message comes in
export function MessageList({ messages, currentSenderType }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        No messages yet, say hello
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          currentSenderType={currentSenderType}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}