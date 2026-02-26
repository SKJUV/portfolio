export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeType: "security" | "education" | "university" | "academic";
  stack: string[];
  securityPoints: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SecuritySkill {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  icon: string;
  title: string;
  items: string[];
}

export interface ProfileCategory {
  icon: string;
  title: string;
  points: string[];
}
