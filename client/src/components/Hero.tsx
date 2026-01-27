import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getHeroData } from "@/lib/dataLoader";
import { smoothScrollTo } from "@/lib/scrollUtils";
import * as Icons from "lucide-react";

export function Hero() {
  const heroData = getHeroData();
  const CheckCircleIcon = Icons[heroData.features[0].icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-secondary/20 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                {heroData.badge.text}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-primary">
              {heroData.heading.line1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-600">
                {heroData.heading.line2}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => smoothScrollTo(heroData.cta.primary.to, 80)}
                className="w-full sm:w-auto text-base px-8 py-6 rounded-xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                {heroData.cta.primary.text}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => smoothScrollTo(heroData.cta.secondary.to, 80)}
                className="w-full sm:w-auto text-base px-8 py-6 rounded-xl border-2 hover:bg-secondary/5 hover:text-secondary hover:border-secondary/20 transition-all group"
              >
                {heroData.cta.secondary.text}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium text-muted-foreground border-t border-border/50 pt-8">
              {heroData.features.map((feature, idx) => {
                const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-5 h-5 text-secondary" />}
                    <span>{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Visual Image - Molecular structure or Lab Setting */}
            {/* Unsplash: Laboratory/Medical clean visual */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
              {/* Using descriptive comment for Unsplash */}
              {/* pharmaceutical laboratory research clean blue modern */}
              <img 
                src={heroData.image.url} 
                alt={heroData.image.alt} 
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-secondary/20 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">{heroData.badgeOverlay.title}</p>
                    <p className="text-xs text-muted-foreground">{heroData.badgeOverlay.subtitle}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: `${heroData.badgeOverlay.progress}%` }} />
                </div>
                <p className="text-[10px] text-right mt-1 font-mono text-muted-foreground">Compliance: {heroData.badgeOverlay.compliance}</p>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pattern-dots opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
