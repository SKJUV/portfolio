"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Settings } from "@/lib/content";

interface HeroProps {
  settings: Settings;
}

export default function Hero({ settings }: HeroProps) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"spec" | "audit">("spec");
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const runAudit = () => {
    if (auditRunning) return;
    setAuditRunning(true);
    setAuditComplete(false);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditComplete(true);
    }, 900);
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Eyebrow / Swiss Spec Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
            <span>INDEX // 2026</span>
            <span>·</span>
            <span>YAOUNDÉ, CM</span>
            <span>·</span>
            <span>BACKEND DEV @ PAPYRUS</span>
            <span>·</span>
            <span>CYBERSECURITY</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">
              {locale === "fr" ? "DISPONIBLE POUR PROJETS" : "AVAILABLE FOR PROJECTS"}
            </span>
          </div>
        </div>

        {/* Hero Grid: Editorial Typography + Interactive Spec */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column (7 cols): Bold Headline & Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-xs font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  // ARCHITECTURAL PROFILE
                </p>
                <a
                  href="https://papyrus.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Backend Developer @ papyrus.tech</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.06] text-zinc-950 dark:text-white">
                SINENG KENGNI <br className="hidden sm:inline" />
                <span className="text-zinc-400 dark:text-zinc-500">Juvenal</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-800 dark:text-zinc-200 tracking-tight">
                {locale === "fr"
                  ? "Développeur Backend @ Papyrus & Ingénieur Sécurité Systèmes."
                  : "Backend Developer @ Papyrus & Systems Security Engineer."}
              </p>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                {locale === "fr"
                  ? "Développeur Backend de la plateforme Papyrus (marketplace scolaire camerounaise & échanges IA). Conception d'architectures d'APIs résilientes, de flux transactionnels durcis et de systèmes sécurisés par défaut."
                  : "Backend Developer of the Papyrus platform (Cameroonian EdTech marketplace & AI exchanges). Engineering resilient API architectures, hardened transaction flows, and secure-by-default systems."}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                <span>{locale === "fr" ? "Initier un contact" : "Initiate Contact"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
              >
                <span>{locale === "fr" ? "Explorer les travaux" : "Inspect Work"}</span>
              </a>

              {/* Monospace Quick Links */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={settings.contactGithub || "https://github.com/SKJUV"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={settings.contactLinkedin || "https://cm.linkedin.com/in/juvenal-sineng-kengni"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.contactEmail || "sinengjuvenal@gmail.com"}`}
                  className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Swiss System Inspector Card */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden shadow-sm">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
                    SYS_SPECIFICATION // v2.6
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  <button
                    onClick={() => setActiveTab("spec")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeTab === "spec"
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    SPECS
                  </button>
                  <button
                    onClick={() => setActiveTab("audit")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeTab === "audit"
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    SECURITY AUDIT
                  </button>
                </div>
              </div>

              {/* Inspector Content */}
              {activeTab === "spec" ? (
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80 text-xs">
                  <div className="p-3.5 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                      CURRENT ROLE
                    </span>
                    <a
                      href="https://papyrus.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-zinc-900 dark:text-zinc-100 text-right flex items-center gap-1.5 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Backend Developer @ Papyrus ↗</span>
                    </a>
                  </div>

                  <div className="p-3.5 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                      PLATFORM
                    </span>
                    <a
                      href="https://papyrus.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-zinc-700 dark:text-zinc-300 text-right hover:underline"
                    >
                      papyrus.tech (EdTech & Marketplace)
                    </a>
                  </div>

                  <div className="p-3.5 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                      PRIMARY STACK
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 text-right">
                      Node.js · REST APIs · PostgreSQL · Rust
                    </span>
                  </div>

                  <div className="p-3.5 flex items-start justify-between gap-4">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                      SECURITY FOCUS
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 text-right">
                      OWASP Top 10 · Pentest · Strict RLS
                    </span>
                  </div>

                  <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/30 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>HOST // sineng-juvenal.me</span>
                    <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      HARDENED
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">EDGE_AUTH_MIDDLEWARE</span>
                      <span className="text-zinc-700 dark:text-zinc-300">HMAC-SHA256 [PASS]</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">SUPABASE_DATA_ACCESS</span>
                      <span className="text-zinc-700 dark:text-zinc-300">RLS STRICT [ACTIVE]</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">SECURITY_HEADERS</span>
                      <span className="text-zinc-700 dark:text-zinc-300">HSTS, CSP, X-Frame [PASS]</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">DEPENDENCY_TREE</span>
                      <span className="text-zinc-700 dark:text-zinc-300">0 High/Critical [CLEAN]</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      onClick={runAudit}
                      disabled={auditRunning}
                      className="w-full py-2 px-3 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950 text-xs font-mono flex items-center justify-center gap-2 text-zinc-800 dark:text-zinc-200 transition-colors"
                    >
                      <Activity className={`w-3.5 h-3.5 ${auditRunning ? "animate-spin" : ""}`} />
                      <span>
                        {auditRunning
                          ? locale === "fr"
                            ? "VÉRIFICATION EN COURS..."
                            : "VERIFYING TELEMETRY..."
                          : auditComplete
                          ? locale === "fr"
                            ? "TOUS LES CONTRÔLES SONT VALIDES ✓"
                            : "ALL POSTURE CONTROLS VALID ✓"
                          : locale === "fr"
                          ? "EXÉCUTER LE SCAN DE POSTURE"
                          : "RUN POSTURE HEALTHCHECK"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swiss Architectural Spec Bar (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden backdrop-blur-md">
          <div className="p-4 bg-white/85 dark:bg-zinc-950/80 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              01 // ROLE
            </span>
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              Backend Dev @ Papyrus
            </p>
          </div>

          <div className="p-4 bg-white/85 dark:bg-zinc-950/80 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              02 // PLATFORM
            </span>
            <a
              href="https://papyrus.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>papyrus.tech</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          <div className="p-4 bg-white/85 dark:bg-zinc-950/80 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              03 // CORE ARSENAL
            </span>
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              APIs · PostgreSQL · Rust · Security
            </p>
          </div>

          <div className="p-4 bg-white/85 dark:bg-zinc-950/80 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              04 // POSTURE & BASE
            </span>
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Zero-Trust · Yaoundé, CM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
