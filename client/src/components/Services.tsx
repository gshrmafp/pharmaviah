import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getServicesData } from "@/lib/dataLoader";
import * as Icons from "lucide-react";
import { useState } from "react";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";

export function Services() {
  const servicesData = getServicesData();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">{servicesData.section.badge}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">{servicesData.section.title}</h3>
          <p className="text-muted-foreground text-lg">
            {servicesData.section.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => handleServiceClick(service.id)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {IconComponent && <IconComponent className={`w-7 h-7 ${service.color}`} />}
                </div>
                
                <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {service.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                  {service.shortDescription}
                </p>

                <div className="flex items-center text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn more <ArrowUpRight className="ml-1 w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <ServiceDetailModal
        serviceId={selectedService}
        open={selectedService !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      />
    </section>
  );
}
