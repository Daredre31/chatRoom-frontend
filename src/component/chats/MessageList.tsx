import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "../../types/message";

interface Props {
  messages: Message[];
  currentSenderType: "client" | "worker";
  loading?: boolean;
}

function formatDayLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString([], { month: "long", day: "numeric" });
}

// groups messages by calendar day, so a divider appears whenever the day changes
function groupByDay(messages: Message[]): { label: string; items: Message[] }[] {
  const groups: { label: string; items: Message[] }[] = [];

  for (const msg of messages) {
    const label = formatDayLabel(new Date(msg.createdAt));
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.items.push(msg);
    } else {
      groups.push({ label, items: [msg] });
    }
  }

  return groups;
}

export function MessageList({ messages, currentSenderType, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
        Loading conversation
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-sm text-text-secondary font-medium mb-1">
          No messages yet
        </p>
        <p className="text-xs text-text-muted">
          Send the first message to start the conversation
        </p>
      </div>
    );
  }

  const groups = groupByDay(messages);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-bg-page">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="flex justify-center my-3">
            <span className="text-[11px] font-medium text-text-secondary bg-bg-soft px-3 py-1 rounded-full">
              {group.label}
            </span>
          </div>
          {group.items.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              currentSenderType={currentSenderType}
            />
          ))}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}