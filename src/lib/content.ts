import settingsData from "@/content/settings.json";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import securityData from "@/content/security.json";
import certificationsData from "@/content/certifications.json";
import aboutData from "@/content/about.json";
import credlyData from "@/content/credly.json";

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
  isSpecialization?: boolean;
  grade?: string;
  remoteImageUrl?: string;
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

export interface AboutPillar {
  icon: string;
  title: string;
  title_en?: string;
  summary: string;
  summary_en?: string;
}

export interface AboutHighlight {
  label: string;
  label_en?: string;
  value: string;
}

export interface AboutData {
  bio: {
    fr: string;
    en: string;
  };
  pillars?: AboutPillar[];
  highlights?: AboutHighlight[];
  profileCategories?: ProfileCategory[];
  terminalLines?: any[];
  vision?: VisionItem[];
}

export interface CredlyBadge {
  id: string;
  title: string;
  title_en?: string;
  issuer: string;
  date: string;
  badgeId: string;
  badgeUrl: string;
  imageUrl: string;
  skills: string[];
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
  credlyUrl?: string;
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

export function getCredlyBadges(): CredlyBadge[] {
  return credlyData as unknown as CredlyBadge[];
}
