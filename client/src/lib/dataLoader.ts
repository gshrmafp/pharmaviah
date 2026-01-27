import companyData from "@/data/company.json";
import navbarData from "@/data/navbar.json";
import heroData from "@/data/hero.json";
import servicesData from "@/data/services.json";
import aboutData from "@/data/about.json";
import processData from "@/data/process.json";
import contactData from "@/data/contact.json";
import footerData from "@/data/footer.json";

// Type definitions
export interface CompanyData {
  name: string;
  tagline: string;
  displayName: string;
  icon: string;
}

export interface NavbarLink {
  name: string;
  to: string;
}

export interface NavbarData {
  links: NavbarLink[];
  contactButtonText: string;
  mobileContactButtonText: string;
}

export interface HeroData {
  badge: {
    text: string;
  };
  heading: {
    line1: string;
    line2: string;
    gradientStart: string;
    gradientEnd: string;
  };
  description: string;
  cta: {
    primary: {
      text: string;
      to: string;
    };
    secondary: {
      text: string;
      to: string;
    };
  };
  features: Array<{
    text: string;
    icon: string;
  }>;
  image: {
    url: string;
    alt: string;
  };
  badgeOverlay: {
    title: string;
    subtitle: string;
    progress: number;
    compliance: string;
  };
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  color: string;
  bg: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases: string[];
}

export interface ServicesData {
  section: {
    badge: string;
    title: string;
    description: string;
  };
  services: Service[];
}

export interface AboutData {
  title: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessData {
  badge: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  image: {
    url: string;
    alt: string;
    quote: string;
  };
}

export interface ContactData {
  title: string;
  description: string;
  info: {
    email: {
      label: string;
      value: string;
      icon: string;
    };
    phone: {
      label: string;
      value: string;
      icon: string;
    };
    address: {
      label: string;
      value: string;
      icon: string;
    };
  };
  hours: string;
  form: {
    successTitle: string;
    successMessage: string;
    whatsappButton: string;
    anotherMessageButton: string;
    disclaimer: string;
  };
}

export interface FooterData {
  description: string;
  quickLinks: string[];
  legalLinks: Array<{
    text: string;
    href: string;
  }>;
  copyright: string;
}

// Data getters with caching
let cachedData: {
  company?: CompanyData;
  navbar?: NavbarData;
  hero?: HeroData;
  services?: ServicesData;
  about?: AboutData;
  process?: ProcessData;
  contact?: ContactData;
  footer?: FooterData;
} = {};

export function getCompanyData(): CompanyData {
  if (!cachedData.company) {
    cachedData.company = companyData as CompanyData;
  }
  return cachedData.company;
}

export function getNavbarData(): NavbarData {
  if (!cachedData.navbar) {
    cachedData.navbar = navbarData as NavbarData;
  }
  return cachedData.navbar;
}

export function getHeroData(): HeroData {
  if (!cachedData.hero) {
    cachedData.hero = heroData as HeroData;
  }
  return cachedData.hero;
}

export function getServicesData(): ServicesData {
  if (!cachedData.services) {
    cachedData.services = servicesData as ServicesData;
  }
  return cachedData.services;
}

export function getServiceById(id: string): Service | undefined {
  const data = getServicesData();
  return data.services.find(service => service.id === id);
}

export function getAboutData(): AboutData {
  if (!cachedData.about) {
    cachedData.about = aboutData as AboutData;
  }
  return cachedData.about;
}

export function getProcessData(): ProcessData {
  if (!cachedData.process) {
    cachedData.process = processData as ProcessData;
  }
  return cachedData.process;
}

export function getContactData(): ContactData {
  if (!cachedData.contact) {
    cachedData.contact = contactData as ContactData;
  }
  return cachedData.contact;
}

export function getFooterData(): FooterData {
  if (!cachedData.footer) {
    cachedData.footer = footerData as FooterData;
  }
  return cachedData.footer;
}
