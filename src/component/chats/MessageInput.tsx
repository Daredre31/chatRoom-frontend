import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
}

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-bg-card border-t border-border-soft"
    >
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        disabled={disabled}
        className="flex-1 bg-bg-page border border-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !content.trim()}
        aria-label="Send message"
        className="w-10 h-10 shrink-0 flex items-center justify-center bg-teal hover:bg-teal-hover text-white rounded-full transition-colors disabled:opacity-40"
      >
        <SendIcon />
      </button>
    </form>
  );
}