import { motion } from "framer-motion";
import { getProcessData } from "@/lib/dataLoader";
import * as Icons from "lucide-react";

export function Process() {
  const processData = getProcessData();

  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">{processData.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">{processData.title}</h3>
            <p className="text-muted-foreground text-lg mb-8">
              {processData.description}
            </p>
            
            <div className="space-y-8">
              {processData.steps.map((step, idx) => {
                const IconComponent = Icons[step.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-4 group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300 z-10 relative">
                        {IconComponent && <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />}
                      </div>
                      {idx !== processData.steps.length - 1 && (
                        <div className="absolute top-12 left-1/2 w-px h-12 bg-slate-200 -translate-x-1/2" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-secondary/10 rounded-3xl transform rotate-3" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={processData.image.url} 
                alt={processData.image.alt} 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/90 to-transparent text-white">
                <p className="font-serif italic text-xl">"{processData.image.quote}"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
