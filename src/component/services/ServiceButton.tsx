import type { Service } from "../../types/service";

interface Props {
  service: Service;
  onSelect: (slug: string) => void;
  disabled?: boolean;
}

export function ServiceButton({ service, onSelect, disabled }: Props) {
  return (
    <button
      onClick={() => onSelect(service.slug)}
      disabled={disabled}
      className="bg-brand-blue text-brand-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
    >
      {service.serviceName}
    </button>
  );
}