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
  badgeType: "security" | "education" | "university" | "academic";
  stack: string[];
  securityPoints: string[];
  securityPoints_en?: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SecuritySkill {
  icon: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  tags: string[];
}

export interface SkillCategory {
  icon: string;
  title: string;
  title_en?: string;
  items: string[];
}

export interface ProfileCategory {
  icon: string;
  title: string;
  title_en?: string;
  points: string[];
  points_en?: string[];
}
