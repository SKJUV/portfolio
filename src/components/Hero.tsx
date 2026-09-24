"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "./ui/Button";
import type { Settings } from "@/lib/content";

interface HeroProps {
  settings: Settings;
}

export default function Hero({ settings }: HeroProps) {
  const { locale } = useLanguage();

  // --- Terminal Typewriter ---
  const fullCommand = "skjuv audit --production";
  const [typedChars, setTypedChars] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const auditSteps = useMemo(
    () => [
      { label: "HTTP Headers (HSTS, CSP)", result: "PASS" },
      { label: "OWASP Top 10 Scan", result: "CLEAN" },
      { label: "Docker Container", result: "SECURE" },
    ],
    []
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typedChars < fullCommand.length) {
      timer = setTimeout(() => setTypedChars((p) => p + 1), 30);
    } else if (currentStepIndex < auditSteps.length) {
      timer = setTimeout(() => setCurrentStepIndex((p) => p + 1), 320);
    } else {
      setIsTypingDone(true);
    }
    return () => clearTimeout(timer);
  }, [typedChars, currentStepIndex, fullCommand.length, auditSteps.length]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedChars, currentStepIndex, isTypingDone]);

  const restartTyping = () => {
    setTypedChars(0);
    setCurrentStepIndex(0);
    setIsTypingDone(false);
  };

  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Identity */}
        <div className="space-y-6">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {locale === "fr"
              ? "Disponible pour opportunités"
              : "Open to opportunities"}
          </div>

          {/* Name */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gradient-blue">Juvenal</span>
              <br />
              <span className="text-zinc-800 dark:text-zinc-100">
                SINENG KENGNI
              </span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              {locale === "fr"
                ? "Cybersécurité & Full-Stack"
                : "Cybersecurity & Full-Stack"}
            </p>
          </div>

          {/* Brief tagline */}
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-md">
            {locale === "fr"
              ? "Conception de systèmes web sécurisés, performants et fondés sur les principes Zero-Trust."
              : "Building secure, high-performance web systems grounded in Zero-Trust principles."}
          </p>

          {/* CTA + Socials */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {locale === "fr" ? "Voir mes projets" : "View projects"}
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              icon={<Mail className="w-4 h-4" />}
            >
              Contact
            </Button>

            <div className="flex items-center gap-1.5 ml-1">
              <a
                href={
                  settings.githubUrl ||
                  settings.contactGithub ||
                  "https://github.com/SKJUV"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={
                  settings.linkedinUrl ||
                  settings.contactLinkedin ||
                  "https://cm.linkedin.com/in/juvenal-sineng-kengni"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Compact Terminal */}
        <div className="relative">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-lg overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-zinc-500" />
                  ~/security-audit
                </span>
              </div>
              <button
                onClick={restartTyping}
                className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Replay"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 h-[220px] overflow-y-auto text-zinc-400 leading-relaxed"
            >
              {/* Command line */}
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400">$</span>
                <span className="text-zinc-200">
                  {fullCommand.slice(0, typedChars)}
                </span>
                {typedChars < fullCommand.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-blue-400 animate-pulse rounded-sm" />
                )}
              </div>

              {/* Steps */}
              {typedChars >= fullCommand.length && (
                <div className="mt-3 space-y-1.5">
                  {auditSteps
                    .slice(0, currentStepIndex)
                    .map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-zinc-300">{step.label}</span>
                        </span>
                        <span className="text-emerald-400 font-medium">
                          {step.result}
                        </span>
                      </div>
                    ))}

                  {isTypingDone && (
                    <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center gap-2 text-[11px] text-blue-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>
                        {locale === "fr"
                          ? "Audit validé — 100% conforme"
                          : "Audit passed — 100% compliant"}
                      </span>
                    </div>
                  )}

                  {isTypingDone && (
                    <div className="mt-2 flex items-center gap-1.5 text-zinc-500">
                      <span className="text-blue-400">$</span>
                      <span className="inline-block w-1.5 h-3.5 bg-blue-400 animate-pulse rounded-sm" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
