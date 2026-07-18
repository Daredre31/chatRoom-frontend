import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  eyebrow: string;
  title: string;
}

// shared shell for worker login and signup
// dark panel carries the brand, right side stays plain so the form is the focus
export function AuthLayout({ children, eyebrow, title }: Props) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 bg-dark flex-col justify-between p-10">
        <span
          className="text-teal-mid font-semibold text-sm tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Bluevantex
        </span>

        <div>
          <p className="text-sidebar-text text-xs uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
          <h1
            className="text-3xl text-white font-bold leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
        </div>

        <p className="text-sidebar-muted text-xs">
          Real conversations, routed to the right person.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center bg-bg-page px-6 py-12">
        <div className="w-full max-w-sm animate-fade-in-up">{children}</div>
      </div>
    </div>
  );
}