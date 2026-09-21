"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import {
  GraduationCap,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Award,
  MapPin,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";
import type { AboutData } from "@/lib/content";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const { locale } = useLanguage();

  const bioText =
    locale === "fr"
      ? data.bio?.fr ||
        "Étudiant en Informatique à l'Université de Yaoundé 1 et développeur passionné par la cybersécurité. Je conçois des applications web et logicielles robustes en alliant rigueur d'ingénierie, architecture résiliente et protection proactive contre les vulnérabilités."
      : data.bio?.en ||
        "Computer Science student at University of Yaounde 1 and cybersecurity enthusiast. I build robust web and software applications by combining engineering rigor, resilient architecture, and proactive vulnerability protection.";

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader
          badge={locale === "fr" ? "PROFIL & FONDATIONS" : "PROFILE & FOUNDATIONS"}
          title={
            locale === "fr"
              ? "Architecturer avec Rigueur, Construire pour l'Impact"
              : "Architecting with Rigor, Building for Impact"
          }
          description={
            locale === "fr"
              ? "Alliant formation académique d'excellence et audits de sécurité proactifs pour des applications fiables et durables."
              : "Bridging academic computer science rigor with proactive security auditing for resilient, high-grade applications."
          }
        />

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Item 1: Primary Narrative (8 cols) */}
          <div className="md:col-span-8 p-7 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle corner highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "Démarche d'ingénierie" : "Engineering Mindset"}</span>
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

            {/* Academic & Community Pills */}
            <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                {locale === "fr" ? "Écosystème & Communautés Actives" : "Ecosystem & Active Communities"}
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                  Université de Yaoundé 1
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  GDG Yaoundé & GDSC
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  Django Cameroon
                </span>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Quick Metrics & Credentials (4 cols) */}
          <div className="md:col-span-4 p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900/80 dark:to-zinc-950/90 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {locale === "fr" ? "Indicateurs Clés" : "Key Signals"}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {locale === "fr" ? "Disponible" : "Available"}
                </div>
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60 mt-2">
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {locale === "fr" ? "Accréditations certifiées" : "Certified Credentials"}
                  </span>
                  <span className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    8 (IBM, Google)
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {locale === "fr" ? "Posture sécurité" : "Security Posture"}
                  </span>
                  <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                    Zero Trust
                  </span>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {locale === "fr" ? "Localisation" : "Location"}
                  </span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    Yaoundé, CM
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {locale === "fr"
                  ? "Audit en profondeur & conformité OWASP Top 10"
                  : "Deep application audits & OWASP Top 10 standards"}
              </span>
            </div>
          </div>

          {/* Bento Item 3: Practical Security & CTF (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === "fr" ? "Cybersécurité & Audits Offensifs" : "Cybersecurity & Hands-on CTF"}
                </h4>
                <p className="text-xs text-zinc-500">
                  {locale === "fr" ? "Entraînement CTF et défense active" : "CTF challenges & proactive defense"}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                <span className="text-blue-500 font-mono font-bold mt-0.5">01</span>
                <span>
                  <strong>Hack The Box & OverTheWire CTFs :</strong>{" "}
                  {locale === "fr"
                    ? "Exploitation méthodique, élévation de privilèges et durcissement système."
                    : "Methodical exploitation, privilege escalation, and system hardening."}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                <span className="text-blue-500 font-mono font-bold mt-0.5">02</span>
                <span>
                  <strong>OWASP Top 10 & Crypto :</strong>{" "}
                  {locale === "fr"
                    ? "Revue de code anti-XSS, CSRF, injections SQL, chiffrement C++ et hashing BCrypt."
                    : "Code review protecting against XSS, CSRF, SQLi, C++ encryption & BCrypt hashing."}
                </span>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Engineering & Systems (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === "fr" ? "Ingénierie Systèmes & Production" : "Systems Engineering & Delivery"}
                </h4>
                <p className="text-xs text-zinc-500">
                  {locale === "fr" ? "Environnements fiables et architecture scalable" : "Reliable environments & scalable builds"}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                <span className="text-blue-500 font-mono font-bold mt-0.5">03</span>
                <span>
                  <strong>Maîtrise POSIX & Linux :</strong>{" "}
                  {locale === "fr"
                    ? "Process, gestion mémoire, sockets, scripting Shell et diagnostics réseau avancés."
                    : "Process inspection, memory management, sockets, shell scripting & network diagnostics."}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
                <span className="text-blue-500 font-mono font-bold mt-0.5">04</span>
                <span>
                  <strong>Clean Architecture & CI/CD :</strong>{" "}
                  {locale === "fr"
                    ? "Next.js 15, TypeScript strict, Docker multi-stage, pipelines d'intégration continue."
                    : "Next.js 15, strict TypeScript, multi-stage Docker builds, automated CI/CD pipelines."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
