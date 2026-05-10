import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getServicesData } from "@/lib/dataLoader";
import * as Icons from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";

export function Services() {
  const servicesData = getServicesData();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const scrollingServices = useMemo(
    () => [...servicesData.services, ...servicesData.services],
    [servicesData.services],
  );

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container || isAutoScrollPaused || selectedService) {
      return;
    }

    let lastTimestamp = 0;
    const pixelsPerSecond = 28;

    const tick = (timestamp: number) => {
      if (!scrollContainerRef.current) {
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const loopPoint = scrollContainerRef.current.scrollWidth / 2;
      scrollContainerRef.current.scrollLeft += (pixelsPerSecond * delta) / 1000;

      if (scrollContainerRef.current.scrollLeft >= loopPoint) {
        scrollContainerRef.current.scrollLeft -= loopPoint;
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrollPaused, selectedService]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20 sm:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-secondary sm:text-base">
            {servicesData.section.badge}
          </h2>
          <h3 className="mb-5 text-3xl font-extrabold leading-tight text-transparent sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary via-secondary to-purple-600 bg-clip-text">
            {servicesData.section.title}
          </h3>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            {servicesData.section.description}
          </p>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          Services now auto-scroll. Hover or swipe to pause and explore.
        </p>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-5 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => setIsAutoScrollPaused(false)}
          onTouchStart={() => setIsAutoScrollPaused(true)}
          onTouchEnd={() => setIsAutoScrollPaused(false)}
        >
          {scrollingServices.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={`${service.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index, servicesData.services.length - 1) * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
                onClick={() => handleServiceClick(service.id)}
                className="group min-w-[280px] max-w-[280px] cursor-pointer rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-xl sm:min-w-[340px] sm:max-w-[340px] lg:min-w-[380px] lg:max-w-[380px]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.bg} transition-transform duration-300 group-hover:scale-110`}>
                    {IconComponent && <IconComponent className={`h-7 w-7 ${service.color}`} />}
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Service
                  </div>
                </div>

                <h4 className="mb-3 text-xl font-bold leading-snug text-primary transition-colors group-hover:text-secondary sm:text-2xl">
                  {service.title}
                </h4>

                <p className="mb-6 line-clamp-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  {service.shortDescription}
                </p>

                <div className="mb-6 h-px w-full bg-gradient-to-r from-secondary/40 via-primary/15 to-transparent" />

                <div className="mb-6 space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <p key={feature} className="text-sm text-slate-600">
                      <span className="mr-2 font-bold text-secondary">•</span>
                      {feature}
                    </p>
                  ))}
                </div>

                <div className="flex items-center text-sm font-semibold text-secondary transition-all duration-300 group-hover:translate-x-1">
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
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
