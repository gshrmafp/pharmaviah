import { Check } from "lucide-react";
import { getAboutData } from "@/lib/dataLoader";

export function About() {
  const aboutData = getAboutData();

  return (
    <section id="about" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{aboutData.title}</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-12">
            {aboutData.description}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {aboutData.features.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
