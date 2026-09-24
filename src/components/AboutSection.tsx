"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, Code2, Terminal } from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale, td } = useLanguage();

  const bioText =
    locale === "fr"
      ? data.bio?.fr ||
        "Étudiant en informatique à Yaoundé et développeur orienté cybersécurité. Je conçois des systèmes résilients, sécurisés par défaut."
      : data.bio?.en ||
        "Computer science student in Yaounde, security-focused developer. Building resilient systems, secured by design.";

  const pillars = [
    {
      icon: ShieldCheck,
      title: locale === "fr" ? "Cybersécurité" : "Cybersecurity",
      summary:
        locale === "fr"
          ? "OWASP, pentest, crypto appliquée"
          : "OWASP, pentesting, applied crypto",
    },
    {
      icon: Code2,
      title: "Full-Stack",
      summary:
        locale === "fr"
          ? "Next.js, TypeScript, APIs robustes"
          : "Next.js, TypeScript, resilient APIs",
    },
    {
      icon: Terminal,
      title: locale === "fr" ? "Systèmes & Cloud" : "Systems & Cloud",
      summary:
        locale === "fr"
          ? "Linux, Docker, CI/CD"
          : "Linux, Docker, CI/CD",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Quote + Bio */}
        <div className="space-y-5 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {locale === "fr" ? "Profil" : "Profile"}
          </p>
          <blockquote className="text-xl sm:text-2xl font-semibold leading-snug text-zinc-800 dark:text-zinc-100 tracking-tight">
            {locale === "fr"
              ? "« La sécurité n'est pas une couche — c'est l'architecture. »"
              : "Security isn't a layer — it's the architecture."}
          </blockquote>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {bioText}
          </p>
        </div>

        {/* 3 Pillars — horizontal, minimal */}
        <div className="grid sm:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="space-y-2">
                <Icon className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {p.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
