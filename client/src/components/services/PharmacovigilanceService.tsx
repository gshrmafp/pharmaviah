import { Service } from "@/lib/dataLoader";

interface PharmacovigilanceServiceProps {
  service: Service;
}

export function PharmacovigilanceService({ service }: PharmacovigilanceServiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-muted-foreground leading-relaxed">
        {service.fullDescription}
      </p>
    </div>
  );
}
