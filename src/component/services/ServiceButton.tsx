import type { Service } from "../../types/service";

interface Props {
  service: Service;
  onSelect: (slug: string) => void;
  disabled?: boolean;
}

// status dot reuses the same semantic colors your dashboard uses for
// payment status, here repointed at whether a worker is actually available
function AvailabilityDot({ hasWorker }: { hasWorker: boolean }) {
  if (hasWorker) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-green">
        <span className="w-1.5 h-1.5 rounded-full bg-green" />
        Available
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-red">
      <span className="w-1.5 h-1.5 rounded-full bg-red" />
      Unavailable
    </span>
  );
}

export function ServiceButton({ service, onSelect, disabled }: Props) {
  const hasWorker = Boolean(service.workerId);

  return (
    <button
      onClick={() => onSelect(service.slug)}
      disabled={disabled}
      className="group w-full text-left bg-bg-card border border-border-soft rounded-xl p-4 transition-colors hover:border-teal-border disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center justify-between">
        <span
          className="font-display font-semibold text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {service.serviceName}
        </span>
        <AvailabilityDot hasWorker={hasWorker} />
      </div>
    </button>
  );
}