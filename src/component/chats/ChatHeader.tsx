interface Props {
  title: string;
  subtitle?: string;
  initial: string;
}

// shared header for both client and worker chat pages
// initial renders as a colored avatar circle, keeps the header feeling personal
export function ChatHeader({ title, subtitle, initial }: Props) {
  return (
    <header className="flex items-center gap-3 px-5 py-4 bg-bg-card border-b border-border-soft">
      <div
        className="w-9 h-9 rounded-full bg-teal-light text-teal flex items-center justify-center text-sm font-semibold shrink-0"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {initial}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-text-secondary truncate">{subtitle}</p>
        )}
      </div>
    </header>
  );
}