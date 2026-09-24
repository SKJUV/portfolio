"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import {
  GraduationCap,
  Terminal,
  ShieldCheck,
  Code2,
  Sparkles,
  MapPin,
  Lock,
} from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale, td } = useLanguage();

  const bioText =
    locale === "fr"
      ? data.bio?.fr ||
        "Étudiant en Informatique à l'Université de Yaoundé 1 et développeur axé sur la cybersécurité. Je conçois des systèmes résilients, performants et sécurisés par défaut."
      : data.bio?.en ||
        "Computer Science student at University of Yaounde 1 and security-focused software engineer. I build resilient, high-performance systems secured by design.";

  const pillars = data.pillars || [
    {
      icon: "ShieldCheck",
      title: "Cybersécurité & Défense",
      title_en: "Cybersecurity & Defense",
      summary: "Audits OWASP Top 10, tests d'intrusion, cryptographie appliquée et pratique CTF.",
      summary_en: "OWASP Top 10 audits, penetration testing, applied cryptography, and CTF challenges."
    },
    {
      icon: "Code2",
      title: "Ingénierie Full-Stack",
      title_en: "Full-Stack Engineering",
      summary: "Next.js 15, TypeScript strict, architectures API résilientes et interfaces modernes.",
      summary_en: "Next.js 15, strict TypeScript, resilient API architectures, and modern user experiences."
    },
    {
      icon: "Terminal",
      title: "Systèmes & Cloud",
      title_en: "Systems & Cloud",
      summary: "Environnements Linux, conteneurs Docker, modélisation SQL et architectures cloud.",
      summary_en: "Linux environments, Docker containers, SQL data modeling, and cloud architecture."
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <SectionHeader
          badge={locale === "fr" ? "PROFIL" : "PROFILE"}
          title={
            locale === "fr"
              ? "Architecturer avec Rigueur & Clarté"
              : "Architecting with Rigor & Clarity"
          }
          description={
            locale === "fr"
              ? "Alliant formation académique en informatique et posture de sécurité proactive."
              : "Bridging computer science foundations with proactive security engineering."
          }
        />

        {/* Clean, Non-Text-Heavy Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Statement & Bio (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "Démarche d'Ingénierie" : "Engineering Mindset"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                {locale === "fr"
                  ? "« La sécurité n'est pas une surcouche, c'est l'essence même de l'architecture. »"
                  : "“Security is not an afterthought, it is the bedrock of architecture.”"}
              </h3>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {bioText}
              </p>
            </div>

            {/* Quick Signals */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                Université de Yaoundé 1
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                Zero Trust by Design
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                Yaoundé, Cameroun
              </span>
            </div>
          </div>

          {/* 3 Pillars Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {pillars.map((pillar, idx) => {
              const IconComponent =
                pillar.icon === "ShieldCheck"
                  ? ShieldCheck
                  : pillar.icon === "Terminal"
                  ? Terminal
                  : Code2;

              const iconColor =
                idx === 0
                  ? "text-blue-500 bg-blue-500/10 border-blue-500/20"
                  : idx === 1
                  ? "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
                  : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm flex items-start gap-4 hover:border-blue-500/30 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {td(pillar.title, pillar.title_en)}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {td(pillar.summary, pillar.summary_en)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
