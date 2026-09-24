"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { ShieldCheck, Server, Layout, Boxes } from "lucide-react";
import type { SkillCategory, SecuritySkill } from "@/lib/content";

interface SkillsSectionProps {
  skills: SkillCategory[];
  securitySkills?: SecuritySkill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { locale, td } = useLanguage();

  const cyberCategory = skills.find((s) => s.icon === "ShieldCheck" || s.title.toLowerCase().includes("cyber"));
  const backendCategory = skills.find((s) => s.icon === "Server" || s.title.toLowerCase().includes("backend"));
  const frontendCategory = skills.find((s) => s.icon === "Layout" || s.title.toLowerCase().includes("frontend"));
  const devopsCategory = skills.find((s) => s.icon === "Boxes" || s.title.toLowerCase().includes("devops"));

  const categories = [
    {
      category: cyberCategory,
      fallbackTitle: "Cybersécurité & Défense",
      fallbackTitleEn: "Cybersecurity & Defense",
      icon: ShieldCheck,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      accent: "border-blue-500/30 hover:border-blue-500/60",
      pillClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
      defaultItems: ["Audit OWASP Top 10", "Tests d'intrusion", "Cryptographie", "Zero Trust", "CTF Practice"]
    },
    {
      category: backendCategory,
      fallbackTitle: "Backend & Données",
      fallbackTitleEn: "Backend & Data",
      icon: Server,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      accent: "border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/40",
      pillClass: "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/50",
      defaultItems: ["Node.js / Express", "PostgreSQL / MySQL", "APIs REST", "Supabase", "Prisma / TypeORM"]
    },
    {
      category: frontendCategory,
      fallbackTitle: "Frontend & Interfaces",
      fallbackTitleEn: "Frontend & Interfaces",
      icon: Layout,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      accent: "border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/40",
      pillClass: "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/50",
      defaultItems: ["Next.js 15 (App Router)", "React 18 / 19", "TypeScript", "Tailwind CSS", "UI/UX Adaptatif"]
    },
    {
      category: devopsCategory,
      fallbackTitle: "Systèmes & DevOps",
      fallbackTitleEn: "Systems & DevOps",
      icon: Boxes,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      accent: "border-zinc-200 dark:border-zinc-800/80 hover:border-cyan-500/40",
      pillClass: "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/50",
      defaultItems: ["Linux (POSIX & Shell)", "Docker Conteneurs", "Git / GitHub Actions", "CI/CD Automatisé", "Cloud & Réseaux"]
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-8">
        <SectionHeader
          badge={locale === "fr" ? "COMPÉTENCES" : "CORE SKILLS"}
          title={
            locale === "fr"
              ? "Arsenal Technique & Sécurité"
              : "Technical Arsenal & Security"
          }
          description={
            locale === "fr"
              ? "Technologies maîtrisées avec rigueur et culture de sécurité par défaut."
              : "Technologies mastered with engineering rigor and a security-first culture."
          }
        />

        {/* Clean, Non-Text-Heavy 4-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            const title = c.category ? td(c.category.title, c.category.title_en) : (locale === "fr" ? c.fallbackTitle : c.fallbackTitleEn);
            const items = c.category?.items || c.defaultItems;

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between space-y-5 transition-all duration-200 ${c.accent}`}
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h3>
                </div>

                {/* Minimalist skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono font-medium ${c.pillClass}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
