// ==========================================
// Types pour le Dashboard Admin
// ==========================================

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  footerText: string;
  contactEmail: string;
  contactGithub: string;
  contactLinkedin: string;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
  order: number;
  component: string; // nom du composant React correspondant
}

export interface Certification {
  id: string;
  name: string;
  platform: string;
  date: string;
  description: string;
  verificationUrl?: string;
  imageUrl?: string;
}

export interface Technology {
  id: string;
  name: string;
  icon?: string;
  category: "frontend" | "backend" | "devops" | "security" | "data" | "other";
}

export interface PortfolioData {
  settings: SiteSettings;
  sections: Section[];
  projects: import("./types").Project[];
  securitySkills: import("./types").SecuritySkill[];
  skillCategories: import("./types").SkillCategory[];
  profileCategories: import("./types").ProfileCategory[];
  certifications: Certification[];
  technologies: Technology[];
  terminalLines: { command: string; output: string }[];
}
