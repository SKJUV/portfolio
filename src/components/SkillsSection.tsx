"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { DynamicIcon } from "./ui/DynamicIcon";
import { ShieldCheck, Server, Layout, Boxes, Check, ArrowRight, Lock } from "lucide-react";
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

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader
          badge={locale === "fr" ? "COMPÉTENCES CLÉS" : "CORE STACK"}
          title={
            locale === "fr"
              ? "Arsenal Technique & Sécurité Active"
              : "Technical Arsenal & Active Security"
          }
          description={
            locale === "fr"
              ? "Sélection rigoureuse des technologies maîtrisées, articulées autour d'une culture de sécurité stricte."
              : "A focused selection of proven technologies anchored in a rigorous, security-first mindset."
          }
        />

        {/* Dynamic Multi-Shape Layout */}
        <div className="space-y-6">
          {/* Shape 1: Featured Cybersecurity Command Center (Full-width custom geometry) */}
          {cyberCategory && (
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-r from-blue-950/20 via-zinc-900/50 to-zinc-900/30 dark:bg-gradient-to-r dark:from-blue-950/30 dark:via-zinc-900/60 dark:to-zinc-950/70 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20 pointer-events-none">
                <ShieldCheck className="w-40 h-40 text-blue-500" />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{locale === "fr" ? "DOMAINE PRIVILÉGIÉ · AUDIT & CTF" : "CORE SPECIALIZATION · AUDIT & CTF"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                    <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                    <span>{td(cyberCategory.title, cyberCategory.title_en)}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {locale === "fr"
                      ? "Protection proactive des applications web, mitigation des vulnérabilités OWASP, cryptographie appliquée et entraînement continu en CTF."
                      : "Proactive web application defense, OWASP vulnerability mitigation, applied cryptography, and continuous CTF training."}
                  </p>
                </div>

                {/* Cyber Skill Chips */}
                <div className="flex flex-wrap gap-2 lg:max-w-md">
                  {cyberCategory.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-950/50 border border-blue-500/30 text-xs font-mono font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shape 2: Tri-Pillar Architecture Grid (3 distinct card types) */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Pillar A: Backend (Console/Server Style) */}
            {backendCategory && (
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">REST · SQL · Auth</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {td(backendCategory.title, backendCategory.title_en)}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {locale === "fr" ? "APIs résilientes et bases relationnelles" : "Resilient APIs & relational data"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                  {backendCategory.items.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center justify-between py-1 px-2.5 rounded-md bg-zinc-50 dark:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300 font-mono"
                    >
                      <span>{tech}</span>
                      <Check className="w-3 h-3 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pillar B: Frontend (Modern UI Showcase Style) */}
            {frontendCategory && (
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Layout className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">React · Next.js 15</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {td(frontendCategory.title, frontendCategory.title_en)}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {locale === "fr" ? "Interfaces réactives et modernes" : "Modern responsive user experiences"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                  {frontendCategory.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 font-medium hover:border-indigo-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pillar C: DevOps & Cloud (Pipeline / Continuous Delivery Style) */}
            {devopsCategory && (
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">CI/CD · Cloud · POSIX</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {td(devopsCategory.title, devopsCategory.title_en)}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {locale === "fr" ? "Conteneurs, surveillance et déploiements" : "Containers, observability & delivery"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                  {devopsCategory.items.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 py-1 px-2.5 rounded-md bg-zinc-50 dark:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                        0{index + 1}
                      </span>
                      <span className="font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
