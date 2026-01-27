import { Stethoscope } from "lucide-react";
import { getFooterData, getCompanyData } from "@/lib/dataLoader";
import { smoothScrollTo } from "@/lib/scrollUtils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerData = getFooterData();
  const companyData = getCompanyData();

  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="w-6 h-6 text-secondary" />
              <span className="font-display font-bold text-2xl">
                {companyData.displayName.split("Consult")[0]}<span className="text-secondary">Consult</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm mb-6 leading-relaxed">
              {footerData.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerData.quickLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => smoothScrollTo(item.toLowerCase(), 80)}
                    className="text-primary-foreground/70 hover:text-secondary cursor-pointer transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerData.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {currentYear} {companyData.displayName}. All rights reserved.</p>
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
