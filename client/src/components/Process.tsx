import { Search, ClipboardCheck, FileCheck, Send } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Analysis",
    desc: "Initial requirement gathering & gap analysis."
  },
  {
    icon: ClipboardCheck,
    title: "Assessment",
    desc: "Detailed technical & compliance audit."
  },
  {
    icon: FileCheck,
    title: "Documentation",
    desc: "Rigorous preparation of dossiers & reports."
  },
  {
    icon: Send,
    title: "Submission",
    desc: "Final review and regulatory submission."
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Streamlined Path to Compliance</h3>
            <p className="text-muted-foreground text-lg mb-8">
              We've developed a proven 4-step methodology that ensures accuracy, efficiency, and successful outcomes for every project.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
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
                      <step.icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                    {idx !== steps.length - 1 && (
                      <div className="absolute top-12 left-1/2 w-px h-12 bg-slate-200 -translate-x-1/2" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">{step.title}</h4>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
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
              {/* Unsplash: diverse team working in office meeting */}
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                alt="Team Collaboration" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/90 to-transparent text-white">
                <p className="font-serif italic text-xl">"Excellence is not an act, but a habit."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
