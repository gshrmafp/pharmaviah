import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Menu, X, Pill, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Services", to: "services" },
  { name: "Process", to: "process" },
  { name: "About", to: "about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Link
            to="hero"
            smooth={true}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-primary p-2 rounded-lg text-white group-hover:bg-secondary transition-colors duration-300">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className={cn(
              "font-display font-bold text-xl tracking-tight transition-colors",
              isScrolled ? "text-primary" : "text-primary"
            )}>
              Pharma<span className="text-secondary">Consult</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                offset={-80}
                className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="contact" smooth={true} offset={-80}>
              <Button 
                variant={isScrolled ? "default" : "default"}
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
              >
                Contact Us
              </Button>
            </Link>
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
                PharmaConsult
              </span>
              <button
                className="p-2 text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-semibold text-primary hover:text-secondary cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link to="contact" smooth={true} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90 shadow-lg">
                  Request Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
