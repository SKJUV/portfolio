"use client";

import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";
import { 
  ShieldAlert, 
  Layers, 
} from "lucide-react";
import type { SkillCategory, SecuritySkill } from "@/lib/content";

interface SkillsSectionProps {
  skills: SkillCategory[];
  securitySkills: SecuritySkill[];
}

export default function SkillsSection({ skills, securitySkills }: SkillsSectionProps) {
  const { locale, td } = useLanguage();
  const [activeTab, setActiveTab] = useState<"tech" | "security">("tech");

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeader
          badge={locale === "fr" ? "COMPÉTENCES & SÉCURITÉ" : "SKILLS & SECURITY"}
          title={
            locale === "fr"
              ? "Arsenal Technique & Standards Sécurité"
              : "Technical Arsenal & Security Standards"
          }
          description={
            locale === "fr"
              ? "De l'ingénierie full-stack aux audits de vulnérabilités, une maîtrise technique security-first orientée performance."
              : "From full-stack engineering to vulnerability auditing, a security-first, high-performance skill set."
          }
        />

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab("tech")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "tech"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{locale === "fr" ? "Technologies & Stack" : "Tech Stack"}</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === "security"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{locale === "fr" ? "Pratiques & Audits Sécurité" : "Security Practices"}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Technologies & Stack */}
        {activeTab === "tech" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {skills.map((category, idx) => (
              <div
                key={idx}
                className="p-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 card-hover shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 inline-flex">
                    {category.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {td(category.title, category.title_en)}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono">
                      {category.items.length} {locale === "fr" ? "technologies" : "tools"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/40 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Pratiques & Audits Sécurité */}
        {activeTab === "security" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {securitySkills.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 card-hover shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 inline-flex">
                      {sec.icon}
                    </span>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {td(sec.title, sec.title_en)}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {td(sec.description, sec.description_en)}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                  {sec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
