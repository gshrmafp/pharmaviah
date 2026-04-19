import siteDataResponse from "@/data/siteData.json";

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

const siteData = siteDataResponse as {
  success: boolean;
  data: {
    company: CompanyData;
    navbar: NavbarData;
    hero: HeroData;
    services: ServicesData;
    about: AboutData;
    process: ProcessData;
    contact: ContactData;
    footer: FooterData;
  };
};

export function getCompanyData(): CompanyData {
  if (!cachedData.company) {
    cachedData.company = siteData.data.company;
  }
  return cachedData.company;
}

export function getNavbarData(): NavbarData {
  if (!cachedData.navbar) {
    cachedData.navbar = siteData.data.navbar;
  }
  return cachedData.navbar;
}

export function getHeroData(): HeroData {
  if (!cachedData.hero) {
    cachedData.hero = siteData.data.hero;
  }
  return cachedData.hero;
}

export function getServicesData(): ServicesData {
  if (!cachedData.services) {
    cachedData.services = siteData.data.services;
  }
  return cachedData.services;
}

export function getServiceById(id: string): Service | undefined {
  const data = getServicesData();
  return data.services.find(service => service.id === id);
}

export function getAboutData(): AboutData {
  if (!cachedData.about) {
    cachedData.about = siteData.data.about;
  }
  return cachedData.about;
}

export function getProcessData(): ProcessData {
  if (!cachedData.process) {
    cachedData.process = siteData.data.process;
  }
  return cachedData.process;
}

export function getContactData(): ContactData {
  if (!cachedData.contact) {
    cachedData.contact = siteData.data.contact;
  }
  return cachedData.contact;
}

export function getFooterData(): FooterData {
  if (!cachedData.footer) {
    cachedData.footer = siteData.data.footer;
  }
  return cachedData.footer;
}
