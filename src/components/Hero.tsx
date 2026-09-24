"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Check, 
  Copy, 
  RotateCcw, 
  FastForward,
  CheckCircle2 
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "./ui/Button";
import type { Settings } from "@/lib/content";

interface HeroProps {
  settings: Settings;
}

export default function Hero({ settings }: HeroProps) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"audit" | "security" | "status">("audit");
  const [copied, setCopied] = useState(false);

  // --- Terminal Typewriter Logic ---
  const fullCommand = "skjuv audit --strict --env=production";
  const [typedChars, setTypedChars] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  const auditSteps = useMemo(() => [
    {
      label: locale === "fr" ? "Headers HTTP (HSTS, CSP, X-Frame)" : "HTTP Headers (HSTS, CSP, X-Frame)",
      status: "PASS (Grade A+)",
      speed: "0.2ms",
      grade: "A+",
    },
    {
      label: locale === "fr" ? "Tokens HMAC-SHA256 zero-trust" : "HMAC-SHA256 Zero-Trust Tokens",
      status: locale === "fr" ? "VALIDE" : "VERIFIED",
      speed: "0.4ms",
      grade: "100%",
    },
    {
      label: locale === "fr" ? "Audit vulnérabilités OWASP Top 10" : "OWASP Top 10 Vulnerabilities",
      status: locale === "fr" ? "0 FAILLE" : "0 DETECTED",
      speed: "1.1ms",
      grade: "CLEAN",
    },
    {
      label: locale === "fr" ? "Conteneurisation Docker hardening" : "Docker Hardened Container",
      status: "NON-ROOT UID 10001",
      speed: "0.1ms",
      grade: "SECURE",
    },
  ], [locale]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (activeTab === "audit") {
      if (typedChars < fullCommand.length) {
        timer = setTimeout(() => {
          setTypedChars((prev) => prev + 1);
        }, 28);
      } else if (currentStepIndex < auditSteps.length) {
        timer = setTimeout(() => {
          setCurrentStepIndex((prev) => prev + 1);
        }, 260);
      } else {
        setIsTypingDone(true);
      }
    }

    return () => clearTimeout(timer);
  }, [activeTab, typedChars, currentStepIndex, fullCommand.length, auditSteps.length]);

  // Auto-scroll terminal on typing update
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [typedChars, currentStepIndex, isTypingDone]);

  const restartTyping = () => {
    setTypedChars(0);
    setCurrentStepIndex(0);
    setIsTypingDone(false);
  };

  const skipTyping = () => {
    setTypedChars(fullCommand.length);
    setCurrentStepIndex(auditSteps.length);
    setIsTypingDone(true);
  };

  // --- Code Snippets ---
  const securitySnippet = `// Security Middleware & Token Verification
import { createHmac, timingSafeEqual } from "crypto";

export async function verifyRequest(req: Request) {
  const signature = req.headers.get("x-signature");
  const timestamp = req.headers.get("x-timestamp");
  
  // Enforce zero-trust replay window (< 300s)
  if (Math.abs(Date.now() - Number(timestamp)) > 300000) {
    throw new SecurityError("Request expired");
  }

  const expected = createHmac("sha256", process.env.ADMIN_SECRET!)
    .update(\`\${timestamp}.\${req.url}\`)
    .digest("hex");

  return timingSafeEqual(Buffer.from(signature!), Buffer.from(expected));
}`;

  const copyContent = () => {
    let textToCopy = "";
    if (activeTab === "audit") {
      textToCopy = `$ ${fullCommand}\n` + auditSteps.map((s, i) => `[${i + 1}/4] ${s.label} -> ${s.status}`).join("\n") + "\n[OK] Integrity 100% verified.";
    } else {
      textToCopy = securitySnippet;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-[300px] h-[250px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Pitch & Profile */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">
              {locale === "fr"
                ? "Disponible pour missions & opportunités"
                : "Available for roles & opportunities"}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
              SINENG KENGNI <br />
              <span className="text-gradient-blue">Juvenal</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300">
              {locale === "fr"
                ? "Cybersécurité & Ingénierie Logicielle Full-Stack"
                : "Cybersecurity & Full-Stack Software Engineering"}
            </p>
          </div>

          {/* Subtitle description */}
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
            {locale === "fr"
              ? "Ingénierie logicielle full-stack et cybersécurité appliquée. Conception de systèmes web résilients, performants et conformes aux principes Zero-Trust."
              : "Full-stack software engineering and applied cybersecurity. Designing resilient, high-performance web systems anchored in Zero-Trust principles."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {locale === "fr" ? "Explorer mes projets" : "Explore projects"}
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              icon={<Mail className="w-4 h-4" />}
            >
              {locale === "fr" ? "Me contacter" : "Contact me"}
            </Button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-zinc-300 dark:border-zinc-800">
              <a
                href={settings.githubUrl || settings.contactGithub || "https://github.com/SKJUV"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil GitHub"
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-blue-500/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.linkedinUrl || settings.contactLinkedin || "https://cm.linkedin.com/in/juvenal-sineng-kengni"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn"
                className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-blue-500/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-800/80 max-w-lg">
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">13</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {locale === "fr" ? "Badges & Certifs" : "Badges & Certs"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">5</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {locale === "fr" ? "Projets Phares" : "Featured Projects"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">100%</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Security-First</div>
            </div>
          </div>
        </div>

        {/* Right Column: Soft Terminal & Live Inspector */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/80 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),0_0_35px_-10px_rgba(59,130,246,0.12)] overflow-hidden font-mono text-xs transition-all duration-300">
            {/* Top ambient hairline highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/60 backdrop-blur-md">
              <div className="flex items-center gap-2">
                {/* Traffic Light Buttons */}
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors border border-rose-400/20 shadow-[0_0_8px_rgba(244,63,94,0.25)] cursor-pointer" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors border border-amber-400/20 shadow-[0_0_8px_rgba(245,158,11,0.25)] cursor-pointer" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors border border-emerald-400/20 shadow-[0_0_8px_rgba(16,185,129,0.25)] cursor-pointer" />

                {/* Soft Breadcrumb */}
                <div className="flex items-center gap-1.5 ml-3 text-[11px] text-zinc-400">
                  <Terminal className="w-3.5 h-3.5 text-blue-400/80 shrink-0" />
                  <span className="text-zinc-500 hidden sm:inline">skjuv@workstation:</span>
                  <span className="text-zinc-300 font-medium">~/security-core</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                {activeTab === "audit" && (
                  <>
                    <button
                      onClick={restartTyping}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all text-[10px]"
                      title={locale === "fr" ? "Rejouer l'animation" : "Replay typing"}
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">{locale === "fr" ? "Rejouer" : "Replay"}</span>
                    </button>
                    {!isTypingDone && (
                      <button
                        onClick={skipTyping}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all text-[10px]"
                        title={locale === "fr" ? "Tout afficher" : "Skip animation"}
                      >
                        <FastForward className="w-3 h-3" />
                        <span className="hidden sm:inline">{locale === "fr" ? "Accélérer" : "Skip"}</span>
                      </button>
                    )}
                  </>
                )}

                {activeTab !== "status" && (
                  <button
                    onClick={copyContent}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all text-[10px]"
                    title="Copier"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{locale === "fr" ? "Copié" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{locale === "fr" ? "Copier" : "Copy"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Soft Tabs Bar */}
            <div className="flex items-center border-b border-zinc-800/50 bg-zinc-900/30 px-3 py-1.5 gap-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab("audit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                  activeTab === "audit"
                    ? "bg-zinc-800/80 text-blue-400 border border-zinc-700/60 shadow-sm font-medium"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>audit.sh</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                  activeTab === "security"
                    ? "bg-zinc-800/80 text-blue-400 border border-zinc-700/60 shadow-sm font-medium"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>middleware.ts</span>
              </button>

              <button
                onClick={() => setActiveTab("status")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                  activeTab === "status"
                    ? "bg-zinc-800/80 text-blue-400 border border-zinc-700/60 shadow-sm font-medium"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>telemetry</span>
              </button>
            </div>

            {/* Window Content */}
            <div
              ref={terminalScrollRef}
              className="p-4 sm:p-5 h-[340px] overflow-y-auto text-zinc-300 leading-relaxed bg-zinc-950/60 scrollbar-thin"
            >
              {/* TAB 1: Live Typewriter Terminal Shell */}
              {activeTab === "audit" && (
                <div className="space-y-3 font-mono text-[12px]">
                  {/* Command prompt typing */}
                  <div className="flex items-center flex-wrap gap-1.5 text-zinc-200">
                    <span className="text-blue-400 font-bold">$</span>
                    <span className="text-zinc-100">{fullCommand.slice(0, typedChars)}</span>
                    {typedChars < fullCommand.length && (
                      <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse rounded-[1px] align-middle" />
                    )}
                  </div>

                  {/* Audit steps execution */}
                  {typedChars >= fullCommand.length && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{locale === "fr" ? "Exécution de la suite d'audits Zero-Trust..." : "Running Zero-Trust Security Test Suite..."}</span>
                      </div>

                      {auditSteps.slice(0, currentStepIndex).map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-[11.5px] transition-all animate-in fade-in duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-zinc-300 font-medium">
                              [{idx + 1}/4] {step.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-right shrink-0">
                            <span className="text-[10px] text-zinc-500 font-mono">{step.speed}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {step.status}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Final status verification banner */}
                      {isTypingDone && (
                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 space-y-1 animate-in fade-in duration-300">
                          <div className="flex items-center gap-2 font-semibold text-xs text-blue-400">
                            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                            <span>
                              {locale === "fr"
                                ? "Audit Intégrité validé — 100% Conforme"
                                : "Integrity Audit Validated — 100% Compliant"}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-6">
                            {locale === "fr"
                              ? "Toutes les couches de défense en profondeur sont actives et opérationnelles."
                              : "All defense-in-depth security layers are active and operational."}
                          </p>
                        </div>
                      )}

                      {/* Ready prompt cursor */}
                      {isTypingDone && (
                        <div className="flex items-center gap-2 pt-1 text-zinc-400">
                          <span className="text-blue-400 font-bold">$</span>
                          <span className="text-zinc-500 text-[11px]">waiting for next instruction...</span>
                          <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse rounded-[1px] align-middle" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Clean Syntax-Highlighted TypeScript */}
              {activeTab === "security" && (
                <div className="space-y-0.5 font-mono text-[11px] leading-relaxed select-text">
                  <div className="text-zinc-500 italic pb-1">
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">01</span>
                    // Zero-Trust Security Middleware & Token Verification
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">02</span>
                    <span className="text-blue-400 font-medium">import</span>
                    <span className="text-zinc-300"> &#123; createHmac, timingSafeEqual &#125; </span>
                    <span className="text-blue-400 font-medium">from</span>
                    <span className="text-emerald-300"> &quot;crypto&quot;</span>;
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">03</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">04</span>
                    <span className="text-blue-400 font-medium">export async function</span>
                    <span className="text-sky-300"> verifyRequest</span>
                    <span className="text-zinc-300">(req: </span>
                    <span className="text-cyan-300">Request</span>
                    <span className="text-zinc-300">) &#123;</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">05</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-blue-400 font-medium">const</span>
                    <span className="text-zinc-200"> signature = req.headers.</span>
                    <span className="text-sky-300">get</span>
                    <span className="text-emerald-300">(&quot;x-signature&quot;)</span>;
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">06</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-blue-400 font-medium">const</span>
                    <span className="text-zinc-200"> timestamp = req.headers.</span>
                    <span className="text-sky-300">get</span>
                    <span className="text-emerald-300">(&quot;x-timestamp&quot;)</span>;
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">07</span>
                  </div>
                  <div className="text-zinc-500 italic">
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">08</span>
                    <span className="text-zinc-400">  </span>
                    // Enforce zero-trust replay window (&lt; 300s)
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">09</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-blue-400 font-medium">if</span>
                    <span className="text-zinc-300"> (Math.</span>
                    <span className="text-sky-300">abs</span>
                    <span className="text-zinc-300">(Date.</span>
                    <span className="text-sky-300">now</span>
                    <span className="text-zinc-300">() - </span>
                    <span className="text-sky-300">Number</span>
                    <span className="text-zinc-300">(timestamp)) &gt; </span>
                    <span className="text-amber-300">300000</span>
                    <span className="text-zinc-300">) &#123;</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">10</span>
                    <span className="text-zinc-400">    </span>
                    <span className="text-blue-400 font-medium">throw new</span>
                    <span className="text-sky-300"> SecurityError</span>
                    <span className="text-emerald-300">(&quot;Request expired&quot;)</span>;
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">11</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-zinc-300">&#125;</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">12</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">13</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-blue-400 font-medium">const</span>
                    <span className="text-zinc-200"> expected = </span>
                    <span className="text-sky-300">createHmac</span>
                    <span className="text-zinc-300">(</span>
                    <span className="text-emerald-300">&quot;sha256&quot;</span>
                    <span className="text-zinc-300">, process.env.ADMIN_SECRET!)</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">14</span>
                    <span className="text-zinc-400">    </span>
                    <span className="text-sky-300">.update</span>
                    <span className="text-emerald-300">(&#96;$&#123;timestamp&#125;.$&#123;req.url&#125;&#96;)</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">15</span>
                    <span className="text-zinc-400">    </span>
                    <span className="text-sky-300">.digest</span>
                    <span className="text-emerald-300">(&quot;hex&quot;)</span>;
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">16</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">17</span>
                    <span className="text-zinc-400">  </span>
                    <span className="text-blue-400 font-medium">return</span>
                    <span className="text-sky-300"> timingSafeEqual</span>
                    <span className="text-zinc-300">(Buffer.</span>
                    <span className="text-sky-300">from</span>
                    <span className="text-zinc-300">(signature!), Buffer.</span>
                    <span className="text-sky-300">from</span>
                    <span className="text-zinc-300">(expected));</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 select-none mr-3 inline-block w-4 text-right">18</span>
                    <span className="text-zinc-300">&#125;</span>
                  </div>
                </div>
              )}

              {/* TAB 3: Soft Telemetry */}
              {activeTab === "status" && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <span className="text-zinc-400 block text-[11px]">Audit OWASP</span>
                      <span className="text-emerald-400 font-semibold font-mono text-sm flex items-center gap-1.5 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Conforme (10/10)</span>
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <span className="text-zinc-400 block text-[11px]">Latence Edge</span>
                      <span className="text-blue-400 font-semibold font-mono text-sm block mt-0.5">
                        &lt; 18 ms
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <span className="text-zinc-400 block text-[11px]">Chiffrement</span>
                      <span className="text-zinc-100 font-semibold font-mono text-sm block mt-0.5">
                        AES-256 / SHA
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                      <span className="text-zinc-400 block text-[11px]">Base OS</span>
                      <span className="text-zinc-100 font-semibold font-mono text-sm block mt-0.5">
                        Linux Manjaro
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/70 space-y-2">
                    <span className="text-zinc-300 font-medium text-xs block">
                      {locale === "fr" ? "Standards & Principes Directeurs" : "Core Security Principles"}
                    </span>
                    <ul className="space-y-2 text-zinc-300 text-[11px]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Zero Trust & RBAC granulaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Validation stricte des entrées (Zod / Schemas)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Headers HSTS preload, CSP strict et X-Frame-Options</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Builds conteneurisés Docker non-root multi-stage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/60 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span className="text-zinc-400">Zero-Trust Engine v2.4</span>
              </span>
              <div className="flex items-center gap-3 text-zinc-500">
                <span className="hidden sm:inline">Branch: main</span>
                <span>UTF-8 · LF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
