"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { ShieldCheck, Server, Terminal, ArrowUpRight } from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale } = useLanguage();

  const bioText =
    locale === "fr"
      ? data.bio?.fr ||
        "Développeur Backend de la plateforme Papyrus (https://papyrus.tech) et étudiant en informatique à Yaoundé. Je conçois des systèmes résilients, audités et sécurisés par conception."
      : data.bio?.en ||
        "Backend Developer of the Papyrus platform (https://papyrus.tech) and computer science student in Yaoundé. Designing resilient, audited systems, secured by design.";

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
      icon: Server,
      title: locale === "fr" ? "Architecture Backend & APIs" : "Backend & API Architecture",
      desc:
        locale === "fr"
          ? "APIs RESTful de production chez Papyrus, intégrité transactionnelle (commandes, paniers) et modélisation de données haute performance."
          : "Production RESTful APIs at Papyrus, transactional integrity (orders, carts), and high-performance data modeling.",
    },
    {
      index: "03",
      icon: Terminal,
      title: locale === "fr" ? "Systèmes Résilients & Données" : "Resilient Systems & Data",
      desc:
        locale === "fr"
          ? "Conteneurisation Docker, durcissement Linux, bases relationnelles PostgreSQL et contrôle d'accès strict (RLS/RBAC)."
          : "Docker containerization, Linux hardening, PostgreSQL relational design, and strict access controls (RLS/RBAC).",
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

            {/* Papyrus Production Spotlight */}
            <div className="p-4 rounded-lg border border-emerald-500/30 dark:border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                    {locale === "fr" ? "PRODUCTION // PAPYRUS.TECH" : "PRODUCTION // PAPYRUS.TECH"}
                  </span>
                </div>
                <a
                  href="https://papyrus.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>papyrus.tech</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {locale === "fr"
                  ? "Développeur Backend de la marketplace scolaire camerounaise. Conception d'APIs REST résilientes, intégrité transactionnelle des commandes et sécurisation des flux de données."
                  : "Backend Developer for Cameroon's school supplies and textbook exchange platform. Designing resilient REST APIs, transactional order integrity, and securing data flows."}
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                YAOUNDÉ, CAMEROUN · UNIVERSITÉ DE YAOUNDÉ 1
              </span>
            </div>
          </div>

          {/* Right Column (7 cols): 3 Hairline Architectural Pillars */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-px bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden backdrop-blur-md">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.index}
                  className="p-5 bg-white/85 dark:bg-zinc-950/80 flex flex-col justify-between space-y-4 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/60 transition-colors"
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
