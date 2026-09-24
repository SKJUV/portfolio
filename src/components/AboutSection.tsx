"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, Code2, Server } from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale } = useLanguage();

  const bioText =
    locale === "fr"
      ? data.bio?.fr ||
        "Étudiant en informatique à Yaoundé et développeur orienté cybersécurité. Je conçois des systèmes résilients, audités et sécurisés par conception."
      : data.bio?.en ||
        "Computer science student in Yaoundé and security-oriented engineer. Designing resilient, audited systems, secured by design.";

  const pillars = [
    {
      index: "01",
      icon: ShieldCheck,
      title: locale === "fr" ? "Sécurité Applicative & Offensive" : "Application & Offensive Security",
      desc:
        locale === "fr"
          ? "Modélisation des menaces, audits OWASP Top 10, tests d'intrusion (pentest) et cryptographie appliquée."
          : "Threat modeling, OWASP Top 10 audits, penetration testing, and applied cryptography.",
    },
    {
      index: "02",
      icon: Code2,
      title: locale === "fr" ? "Ingénierie Full-Stack Robuste" : "Robust Full-Stack Engineering",
      desc:
        locale === "fr"
          ? "Architecture Next.js 15, typage strict TypeScript, Server Actions sécurisées et APIs à haute performance."
          : "Next.js 15 architecture, strict TypeScript typing, hardened Server Actions, and high-performance APIs.",
    },
    {
      index: "03",
      icon: Server,
      title: locale === "fr" ? "Systèmes Résilients & Données" : "Resilient Systems & Data",
      desc:
        locale === "fr"
          ? "Conteneurisation Docker, durcissement Linux, bases relationnelles PostgreSQL/MySQL et contrôle d'accès strict (RLS/RBAC)."
          : "Docker containerization, Linux hardening, PostgreSQL/MySQL relational design, and strict access controls (RLS/RBAC).",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            01 // PHILOSOPHY & BACKGROUND
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:border-zinc-800" />
        </div>

        {/* Swiss Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Manifesto & Bio */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-snug">
              {locale === "fr"
                ? "« La sécurité n’est pas une couche — c’est l’architecture. »"
                : "“Security isn’t an afterthought — it’s the architecture.”"}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {bioText}
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                YAOUNDÉ, CAMEROUN · UNIVERSITÉ DE YAOUNDÉ 1
              </span>
            </div>
          </div>

          {/* Right Column (7 cols): 3 Hairline Architectural Pillars */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.index}
                  className="p-5 bg-white dark:bg-zinc-950 flex flex-col justify-between space-y-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                        //{p.index}
                      </span>
                      <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
