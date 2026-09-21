"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { Card } from "./ui/Card";
import { 
  GraduationCap, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Target, 
  CheckCircle2 
} from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale, td } = useLanguage();

  const visionPillars = [
    {
      icon: Target,
      title: locale === "fr" ? "Vision Technique" : "Technical Vision",
      points: locale === "fr"
        ? [
            "Concevoir des systèmes résilients et sécurisés pour l'Afrique francophone",
            "Démocratiser l'accès aux technologies modernes via l'open-source",
            "Bâtir des architectures robustes et pérennes",
          ]
        : [
            "Design resilient and secure systems for francophone Africa",
            "Democratize access to modern technologies through open-source",
            "Build robust and long-lasting architectures",
          ],
    },
    {
      icon: ShieldCheck,
      title: locale === "fr" ? "Culture Cybersécurité" : "Cybersecurity Culture",
      points: locale === "fr"
        ? [
            "Approfondir les audits OWASP, ISO 27001 et pentesting",
            "Adopter la philosophie Zero Trust dès la première ligne de code",
            "Sensibiliser les développeurs à la sécurité proactive",
          ]
        : [
            "Deepen OWASP audits, ISO 27001, and penetration testing",
            "Adopt Zero Trust mindset from the first line of code",
            "Educate and empower developers towards proactive security",
          ],
    },
    {
      icon: Cpu,
      title: locale === "fr" ? "Intelligence Artificielle" : "Artificial Intelligence",
      points: locale === "fr"
        ? [
            "Exploiter les capacités des LLMs (Google Gemini) en production",
            "Intégrer des agents et flux d'IA pratiques et performants",
            "Créer des solutions augmentées adaptées aux besoins concrets",
          ]
        : [
            "Leverage production LLM capabilities (Google Gemini)",
            "Integrate practical, high-performance AI workflows & agents",
            "Create augmented solutions tailored to real-world needs",
          ],
    },
    {
      icon: Sparkles,
      title: locale === "fr" ? "Philosophie de Travail" : "Work Philosophy",
      points: locale === "fr"
        ? [
            "« Code propre, architecture claire, sécurité d'abord »",
            "Apprentissage continu et partage au sein des communautés",
            "Chaque ligne de code doit servir une intention mesurable",
          ]
        : [
            "\"Clean code, clear architecture, security first\"",
            "Continuous learning and active community contribution",
            "Every line of code must serve a measurable purpose",
          ],
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeader
          badge={locale === "fr" ? "À PROPOS" : "ABOUT ME"}
          title={
            locale === "fr"
              ? "Architecturer avec Rigueur, Construire pour l'Impact"
              : "Architecting with Rigor, Building for Impact"
          }
          description={
            locale === "fr"
              ? "Étudiant à l'Université de Yaoundé 1 et développeur passionné, j'allie la rigueur de l'ingénierie logicielle aux impératifs critiques de la sécurité applicative."
              : "Student at University of Yaounde 1 and passionate engineer, bridging software engineering excellence with critical application security standards."
          }
        />

        {/* Profile & Journey Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Education & Community */}
          <div className="p-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {locale === "fr" ? "Formation & Communautés" : "Education & Ecosystem"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {locale === "fr"
                  ? "Ancrage académique et contribution active"
                  : "Academic roots and community leadership"}
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Université de Yaoundé 1</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Google Developer Groups (GDSC & GDG Yaoundé)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Django Cameroon (Hacktoberfest)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Women TechMakers Yaoundé</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Environment & Systems */}
          <div className="p-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {locale === "fr" ? "Environnement & Systèmes" : "Systems & Linux"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {locale === "fr"
                  ? "Maîtrise des environnements d'ingénierie"
                  : "Engineering environment proficiency"}
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Manjaro Linux KDE (pacman/yay) & Zorin OS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Terminal avancé (process, sockets, config Unix)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Diagnostic réseau & BIOS hardware</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Git CLI & workflows de collaboration</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Security & CTF */}
          <div className="p-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {locale === "fr" ? "Sécurité & Pratique CTF" : "Security & Hands-on CTF"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {locale === "fr"
                  ? "Confrontation continue aux défis de sécurité"
                  : "Continuous challenge and testing"}
              </p>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Hack The Box & OverTheWire (CTF)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Audit vulnérabilités web (OWASP Top 10)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Chiffrement C++ & hashing BCrypt</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Sécurité des flux OAuth PKCE & JWT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Vision Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {locale === "fr" ? "Piliers & Vision Stratégique" : "Pillars & Vision"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {locale === "fr"
                ? "Ce qui guide mes choix architecturaux et mes projets au quotidien"
                : "What drives my architectural decisions and daily projects"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visionPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 card-hover space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{pillar.title}</h4>
                  <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {pillar.points.map((pt, j) => (
                      <li key={j} className="leading-relaxed flex items-start gap-1.5">
                        <span className="text-blue-500 shrink-0 mt-0.5">▪</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
