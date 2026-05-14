import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getHeroData } from "@/lib/dataLoader";
import { smoothScrollTo } from "@/lib/scrollUtils";
import * as Icons from "lucide-react";

export function Hero() {
  const heroData = getHeroData();
  const gradientStartClass =
    {
      secondary: "from-secondary",
      primary: "from-primary",
      "teal-600": "from-teal-600",
      "purple-600": "from-purple-600",
      "blue-600": "from-blue-600",
    }[heroData.heading.gradientStart] ?? "from-secondary";
  const gradientEndClass =
    {
      secondary: "to-secondary",
      primary: "to-primary",
      "teal-600": "to-teal-600",
      "purple-600": "to-purple-600",
      "blue-600": "to-blue-600",
    }[heroData.heading.gradientEnd] ?? "to-teal-600";

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.12),_transparent_30%),linear-gradient(to_bottom,_#ffffff,_#f8fafc)] pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[18%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute right-[-10%] top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute bottom-[-8%] left-1/3 h-44 w-44 rounded-full bg-teal-500/10 blur-3xl sm:h-60 sm:w-60" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {/* <motion.div 
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/90 px-4 py-2 shadow-sm backdrop-blur"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
                {heroData.badge.text}
              </span>
            </motion.div> */}

            <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-7xl">
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: -20 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                style={{ transformPerspective: 1000 }}
                className="block origin-bottom"
              >
                {heroData.heading.line1}
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: -20 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                style={{ transformPerspective: 1000 }}
                className={`block origin-bottom bg-gradient-to-r ${gradientStartClass} ${gradientEndClass} bg-clip-text text-transparent`}
              >
                {heroData.heading.line2}
              </motion.span>
            </h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="mb-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl"
            >
              {heroData.description}
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="mb-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={() => smoothScrollTo(heroData.cta.primary.to, 80)}
                className="h-14 w-full rounded-2xl bg-primary px-8 text-base font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90 sm:w-auto"
              >
                {heroData.cta.primary.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => smoothScrollTo(heroData.cta.secondary.to, 80)}
                className="group h-14 w-full rounded-2xl border-2 border-slate-200 bg-white/80 px-8 text-base font-semibold text-primary backdrop-blur transition-all hover:border-secondary/30 hover:bg-secondary/5 hover:text-secondary sm:w-auto"
              >
                {heroData.cta.secondary.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="grid gap-3 border-t border-slate-200/80 pt-8 sm:grid-cols-2"
            >
              {heroData.features.map((feature, idx) => {
                const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition-all"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                      {IconComponent && <IconComponent className="h-5 w-5 text-secondary" />}
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-secondary/15 via-transparent to-primary/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-2xl backdrop-blur">
                <div className="group relative aspect-[4/4.5] overflow-hidden rounded-[1.5rem] sm:aspect-[4/3]">
                  <img
                    src={heroData.image.url}
                    alt={heroData.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent mix-blend-multiply" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute left-0 top-8 rounded-r-2xl border-y border-r border-white/40 bg-white/80 px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md sm:top-10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">
                    Compliance Confidence
                  </p>
                  <p className="mt-0.5 text-lg font-black text-slate-800 sm:text-xl">
                    {heroData.badgeOverlay.compliance}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 right-6 left-6 sm:left-auto sm:w-[320px] rounded-2xl border border-white/50 bg-white/85 p-5 shadow-[0_20px_40px_rgb(0,0,0,0.15)] backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-teal-400 text-white shadow-inner">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{heroData.badgeOverlay.title}</p>
                      <p className="text-xs font-medium text-slate-500">
                        {heroData.badgeOverlay.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Validated process rigor</span>
                      <span className="text-secondary">
                        {heroData.badgeOverlay.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${heroData.badgeOverlay.progress}%` }}
                        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-secondary to-teal-400"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
                    Toxicology-led compliance support
                  </p>
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Delivery
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary sm:text-base">
                    Audit-ready documentation and guidance
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
