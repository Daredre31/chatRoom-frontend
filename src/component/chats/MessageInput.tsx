import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
}

// plain input plus send button, keeps its own draft state
export function MessageInput({ onSend, disabled }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = content.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        disabled={disabled}
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-brand-blue text-brand-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}