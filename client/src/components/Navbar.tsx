import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { getNavbarData, getCompanyData } from "@/lib/dataLoader";
import { smoothScrollTo } from "@/lib/scrollUtils";
import { debounce } from "@/lib/scrollUtils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarData = getNavbarData();
  const companyData = getCompanyData();

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-border/50"
            : "bg-transparent py-6 border-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-secondary transition-colors duration-300">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className={cn(
              "font-display font-bold text-xl tracking-tight transition-colors",
              isScrolled ? "text-primary" : "text-primary"
            )}>
              {companyData.displayName.split("Consult")[0]}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navbarData.links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => handleNavClick("contact")}
              variant={isScrolled ? "default" : "default"}
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
            >
              {navbarData.contactButtonText}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-display font-bold text-xl text-primary flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-secondary" />
                {companyData.displayName}
              </span>
              <button
                className="p-2 text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-6">
              {navbarData.links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.to)}
                  className="text-2xl font-display font-semibold text-primary hover:text-secondary cursor-pointer text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="h-px bg-border my-2" />
              <Button 
                onClick={() => handleNavClick("contact")}
                className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 shadow-lg"
              >
                {navbarData.mobileContactButtonText}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
