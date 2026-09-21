"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, ArrowRight, ShieldCheck, Terminal, Cpu, Check, Copy } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import type { Settings } from "@/lib/content";

interface HeroProps {
  settings: Settings;
}

export default function Hero({ settings }: HeroProps) {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"security" | "architecture" | "status">("security");
  const [copied, setCopied] = useState(false);

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

  const architectureSnippet = `# System Architecture — High-Resilience
runtime:
  edge: Next.js 15 (SSR / ISR)
  backend: Python Django & FastAPI
  database: PostgreSQL + Redis Caching
  storage: Encrypted S3 / Cloud Bucket

security_policy:
  owasp_level: strict
  auth: OAuth2 + PKCE + HMAC-SHA256
  headers:
    hsts: max-age=31536000; includeSubDomains; preload
    csp: default-src 'self'; script-src 'self'
    frame_options: DENY

deploy:
  orchestration: Docker Multi-stage
  host: Vercel Edge + Dedicated Linux`;

  const copyCode = () => {
    const textToCopy = activeTab === "security" ? securitySnippet : architectureSnippet;
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
              ? "Passionné par la conception de systèmes résilients, l'audit OWASP et l'ingénierie web moderne. Alliant rigueur de sécurité et innovation pour l'écosystème technologique."
              : "Passionate about designing resilient systems, OWASP security audits, and modern full-stack engineering. Merging security rigor and technological innovation."}
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
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">17+</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {locale === "fr" ? "Certifications Pro" : "Certifications"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">8+</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {locale === "fr" ? "Projets Concrets" : "Shipped Projects"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">100%</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Security-First</div>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Linear/Vercel Developer Inspector Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-blue-950/20 overflow-hidden font-mono text-xs">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-zinc-400 text-[11px] hidden sm:inline">
                  skjuv-dev-inspector
                </span>
              </div>

              {/* Copy Button */}
              {activeTab !== "status" && (
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors text-[10px]"
                  title="Copier le code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-zinc-800/80 bg-zinc-900/40 px-2 pt-1 gap-1">
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-[11px] transition-colors ${
                  activeTab === "security"
                    ? "bg-zinc-950 text-blue-400 border-t-2 border-t-blue-500 font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>security.ts</span>
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-[11px] transition-colors ${
                  activeTab === "architecture"
                    ? "bg-zinc-950 text-blue-400 border-t-2 border-t-blue-500 font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>architecture.yml</span>
              </button>
              <button
                onClick={() => setActiveTab("status")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-[11px] transition-colors ${
                  activeTab === "status"
                    ? "bg-zinc-950 text-blue-400 border-t-2 border-t-blue-500 font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>telemetry</span>
              </button>
            </div>

            {/* Window Content */}
            <div className="p-4 sm:p-5 h-[340px] overflow-y-auto text-zinc-300 leading-relaxed bg-zinc-950">
              {activeTab === "security" && (
                <pre className="text-zinc-300 whitespace-pre-wrap selection:bg-blue-600/40">
                  <code>{securitySnippet}</code>
                </pre>
              )}

              {activeTab === "architecture" && (
                <pre className="text-zinc-300 whitespace-pre-wrap selection:bg-blue-600/40">
                  <code>{architectureSnippet}</code>
                </pre>
              )}

              {activeTab === "status" && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Audit OWASP</span>
                      <span className="text-emerald-400 font-semibold font-mono text-sm">
                        Conforme (10/10)
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Latence Edge</span>
                      <span className="text-blue-400 font-semibold font-mono text-sm">&lt; 18 ms</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Chiffrement</span>
                      <span className="text-zinc-100 font-semibold font-mono text-sm">
                        AES-256 / SHA
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px]">Base OS</span>
                      <span className="text-zinc-100 font-semibold font-mono text-sm">
                        Linux Manjaro
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                    <span className="text-zinc-400 font-medium block">
                      {locale === "fr" ? "Principes clés" : "Core Principles"}
                    </span>
                    <ul className="space-y-1.5 text-zinc-300 text-[11px]">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span> Zero Trust & RBAC granulaire
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span> Validation stricte entrées (Zod / Schemas)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span> Headers HSTS, CSP et X-Frame-Options
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span> Builds conteneurisés Docker non-root
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-4 py-2 bg-zinc-900/80 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                <span>Security Engine v2.4</span>
              </span>
              <span className="font-mono text-zinc-400">UTF-8 · LF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
