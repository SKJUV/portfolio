import settingsData from "@/content/settings.json";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import securityData from "@/content/security.json";
import certificationsData from "@/content/certifications.json";
import aboutData from "@/content/about.json";

export interface Project {
  id: string;
  title: string;
  title_en?: string;
  subtitle: string;
  subtitle_en?: string;
  description: string;
  description_en?: string;
  badge: string;
  badge_en?: string;
  badgeType: "security" | "featured" | "arch" | "fullstack" | string;
  layout?: "featured" | "grid" | "compact";
  stack: string[];
  securityPoints: string[];
  securityPoints_en?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  icon: string;
  title: string;
  title_en?: string;
  items: string[];
}

export interface SecuritySkill {
  icon: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  tags: string[];
}

export interface Certification {
  id?: string;
  name: string;
  name_en?: string;
  platform: string;
  date: string;
  description?: string;
  description_en?: string;
  verificationUrl?: string;
  url?: string;
  imageUrl?: string;
  credentialId?: string;
  badge?: string;
}

export interface ProfileCategory {
  icon: string;
  title: string;
  title_en?: string;
  points: string[];
  points_en?: string[];
}

export interface VisionItem {
  id: string;
  title: string;
  title_en?: string;
  icon: string;
  points: string[];
  points_en?: string[];
}

export interface AboutData {
  profileCategories: ProfileCategory[];
  terminalLines?: string[];
  bio: {
    fr: string;
    en: string;
  };
  vision: VisionItem[];
}

export interface Settings {
  siteTitle: string;
  siteTitle_en?: string;
  siteDescription: string;
  siteDescription_en?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroSubtitle_en?: string;
  heroDescription?: string;
  heroDescription_en?: string;
  availableForHire?: boolean;
  contactEmail: string;
  contactGithub?: string;
  contactLinkedin?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  footerText?: string;
  footerText_en?: string;
}

export function getSettings(): Settings {
  return settingsData as unknown as Settings;
}

export function getProjects(): Project[] {
  return projectsData as unknown as Project[];
}

export function getSkills(): SkillCategory[] {
  return skillsData as unknown as SkillCategory[];
}

export function getSecuritySkills(): SecuritySkill[] {
  return securityData as unknown as SecuritySkill[];
}

export function getCertifications(): Certification[] {
  return certificationsData as unknown as Certification[];
}

export function getAbout(): AboutData {
  return aboutData as unknown as AboutData;
}
