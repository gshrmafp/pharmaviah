import { 
  Building2, 
  Activity, 
  FileText, 
  FlaskConical, 
  ArrowUpRight 
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Building2,
    title: "NABH Accreditation",
    description: "Complete guidance for hospitals and healthcare providers to achieve and maintain National Accreditation Board for Hospitals standards.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Activity,
    title: "Pharmacovigilance (PV)",
    description: "Comprehensive drug safety monitoring, adverse event reporting, and risk management planning for pharmaceutical products.",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: FileText,
    title: "MSDS/SDS Authoring",
    description: "Expert authoring of Material Safety Data Sheets compliant with GHS, REACH, and global regulatory requirements.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: FlaskConical,
    title: "Toxicology Assessments",
    description: "Detailed toxicological risk assessments (TRA), PDE calculation, and impurity profiling for drug substances.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">Comprehensive Regulatory Solutions</h3>
          <p className="text-muted-foreground text-lg">
            We provide specialized consulting services tailored to the pharmaceutical and healthcare industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>
              
              <h4 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                {service.title}
              </h4>
              
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more <ArrowUpRight className="ml-1 w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
