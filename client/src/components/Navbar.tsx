import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getNavbarData, getCompanyData } from "@/lib/dataLoader";
import { smoothScrollTo } from "@/lib/scrollUtils";
import { debounce } from "@/lib/scrollUtils";
import * as Icons from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarData = getNavbarData();
  const companyData = getCompanyData();
  const BrandIcon = Icons[
    companyData.icon as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 20);
    }, 10);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    smoothScrollTo(sectionId, 80);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/70 py-3 backdrop-blur-xl"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-3 shadow-lg shadow-slate-900/5 transition-all duration-300 md:px-5",
              isScrolled
                ? "border-white/60 bg-white/85 backdrop-blur-xl"
                : "border-white/50 bg-white/70 backdrop-blur-lg"
            )}
          >
          <button
            onClick={() => handleNavClick("hero")}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-md transition-transform duration-300 group-hover:scale-105">
              {BrandIcon && <BrandIcon className="h-5 w-5" />}
            </div>
            <div className="text-left">
              <p className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                {companyData.displayName}
              </p>
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500 sm:block">
                Regulatory Excellence
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 p-1.5 shadow-inner">
              {navbarData.links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.to)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-primary"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <Button
              onClick={() => handleNavClick("contact")}
              className="h-11 rounded-full bg-secondary px-5 font-semibold text-white shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 hover:bg-secondary/90"
            >
              {navbarData.contactButtonText}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/70 bg-white/80 text-primary shadow-sm md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-slate-950/35 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed inset-x-4 top-4 z-[70] rounded-[2rem] border border-white/70 bg-white/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    {BrandIcon && <BrandIcon className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-base font-bold text-primary">
                      {companyData.displayName}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      Navigation
                    </p>
                  </div>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3 p-5">
                {navbarData.links.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.to)}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-left text-lg font-semibold text-primary transition-all hover:border-secondary/20 hover:bg-secondary/5 hover:text-secondary"
                  >
                    <span>{link.name}</span>
                    <span className="text-sm text-slate-400">0{index + 1}</span>
                  </button>
                ))}

                <Button
                  onClick={() => handleNavClick("contact")}
                  className="mt-2 h-14 w-full rounded-2xl bg-secondary text-base font-semibold shadow-lg shadow-secondary/20 hover:bg-secondary/90"
                >
                  {navbarData.mobileContactButtonText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
