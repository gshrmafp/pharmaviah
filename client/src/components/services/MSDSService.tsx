import { Service } from "@/lib/dataLoader";

interface MSDSServiceProps {
  service: Service;
}

export function MSDSService({ service }: MSDSServiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-muted-foreground leading-relaxed">
        {service.fullDescription}
      </p>
    </div>
  );
}
