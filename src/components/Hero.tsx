"use client";

import { useEffect, useRef, useMemo } from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import Terminal from "./Terminal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function Hero({ data }: { data: PortfolioData }) {
  const { settings, terminalLines } = data;
  const { t, td } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Séparer le nom pour le styling : dernier mot en primary
  const titleParts = settings.heroTitle.split(" ");
  const lastName = titleParts.pop() || "";
  const firstParts = titleParts.join(" ");

  // Translate terminal line outputs for current locale
  const translatedLines = useMemo(() =>
    terminalLines.map((line) => ({ command: line.command, output: td(line.output) })),
    [terminalLines, td]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".hero-animate");
    children.forEach((child, i) => {
      (child as HTMLElement).style.animationDelay = `${i * 0.12}s`;
      child.classList.add("animate-fade-up");
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-[15%] w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <div className="space-y-6">
          {/* Photo + Nom */}
          <div className="hero-animate opacity-0 flex items-center gap-4 sm:gap-5">
            {settings.profileImageUrl ? (
              <div className="relative shrink-0">
                <img
                  src={settings.profileImageUrl}
                  alt={settings.heroTitle}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover ring-2 ring-primary/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse-ring" title={t("hero.available")} />
              </div>
            ) : (
              <div className="relative shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-2 ring-primary/30">
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  {settings.heroTitle.charAt(0)}
                </span>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background animate-pulse-ring" title={t("hero.available")} />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {firstParts} <span className="text-primary">{lastName}</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {settings.heroSubtitle}
              </p>
            </div>
          </div>

          <p className="hero-animate opacity-0 text-muted-foreground leading-relaxed text-sm sm:text-base">
            {settings.heroDescription}
          </p>

          <div className="hero-animate opacity-0 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all glow-primary hover:scale-105 active:scale-95"
            >
              {t("hero.projects")}
            </a>
            <a
              href={settings.contactGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
            >
              <Github className="h-4 w-4" />
              {t("hero.github")}
            </a>
            <a
              href={settings.contactLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
            >
              <Linkedin className="h-4 w-4" />
              {t("hero.linkedin")}
            </a>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
            >
              <Mail className="h-4 w-4" />
              {t("hero.contact")}
            </a>
          </div>
        </div>

        <div className="hero-animate opacity-0">
          <Terminal terminalLines={translatedLines} />
        </div>
      </div>
    </section>
  );
}
