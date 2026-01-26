import { Stethoscope } from "lucide-react";
import { Link } from "react-scroll";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="w-6 h-6 text-secondary" />
              <span className="font-display font-bold text-2xl">
                Pharma<span className="text-secondary">Consult</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm mb-6 leading-relaxed">
              Leading the way in pharmaceutical compliance and safety assessments. Your trusted partner for global regulatory success.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Services", "Process", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase()} 
                    smooth={true} 
                    className="text-primary-foreground/70 hover:text-secondary cursor-pointer transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-secondary transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {currentYear} PharmaConsult. All rights reserved.</p>
          <p>Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
