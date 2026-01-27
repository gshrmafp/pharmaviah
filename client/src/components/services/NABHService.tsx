import { Service } from "@/lib/dataLoader";

interface NABHServiceProps {
  service: Service;
}

export function NABHService({ service }: NABHServiceProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-muted-foreground leading-relaxed">
        {service.fullDescription}
      </p>
    </div>
  );
}
