import { Service } from "@/lib/dataLoader";

interface ToxicologyServiceProps {
  service: Service;
}

export function ToxicologyService({ service }: ToxicologyServiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-muted-foreground leading-relaxed">
        {service.fullDescription}
      </p>
    </div>
  );
}
