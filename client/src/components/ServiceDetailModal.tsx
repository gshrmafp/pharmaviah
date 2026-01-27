import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { getServiceById } from "@/lib/dataLoader";
import * as Icons from "lucide-react";
import { Check } from "lucide-react";

interface ServiceDetailModalProps {
  serviceId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDetailModal({ serviceId, open, onOpenChange }: ServiceDetailModalProps) {
  if (!serviceId) return null;

  const service = getServiceById(serviceId);
  if (!service) return null;

  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary flex items-center gap-3">
            {IconComponent && (
              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${service.color}`} />
              </div>
            )}
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-slate-50 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Key Features</h3>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-primary/5 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Benefits</h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white border border-slate-200 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Use Cases</h3>
            <ul className="space-y-2">
              {service.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-secondary font-semibold mt-1">•</span>
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
