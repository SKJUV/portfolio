"use client";

import { Github, ShieldCheck, ArrowUpRight, Monitor, Database, Sparkles, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Badge } from "./ui/Badge";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { td, locale } = useLanguage();
  const layout = project.layout || (project.featured ? "featured" : "grid");

  /* ========================================================================= */
  /* 1. FEATURED LAYOUT (Flagship Project - Full Width)                        */
  /* ========================================================================= */
  if (layout === "featured") {
    return (
      <div className="p-7 sm:p-9 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-white via-zinc-50 to-blue-500/5 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-blue-950/20 shadow-md relative overflow-hidden group">
        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Main info (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {td(project.badge, project.badge_en)}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Production Live
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {td(project.title, project.title_en)}
              </h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                {td(project.subtitle, project.subtitle_en)}
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
              {td(project.description, project.description_en)}
            </p>

            {/* Stack Chips */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-150 group"
                >
                  <span>{locale === "fr" ? "Visiter le site" : "Live Demo"}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Technical Architecture snapshot (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-white/80 dark:bg-zinc-950/70 border border-zinc-200/90 dark:border-zinc-800/80 shadow-inner space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>{locale === "fr" ? "Architecture Sécurité" : "Security Architecture"}</span>
            </div>

            <div className="space-y-2.5">
              {project.securityPoints?.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{td(point, project.securityPoints_en?.[idx])}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/60">
              <span>Stack: Next.js 15 App Router</span>
              <span className="text-blue-500">Zero Trust</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 2. COMPACT LAYOUT (Horizontal Bar Ribbon)                                 */
  /* ========================================================================= */
  if (layout === "compact") {
    const isDesktopApp = project.stack.some((s) => s.includes("C#") || s.includes("Avalonia"));
    return (
      <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
            {isDesktopApp ? <Monitor className="w-5 h-5 text-blue-500" /> : <Database className="w-5 h-5 text-amber-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {td(project.title, project.title_en)}
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {td(project.badge, project.badge_en)}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 max-w-xl">
              {td(project.subtitle, project.subtitle_en)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800/60">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-500/10 hover:text-blue-500 text-zinc-600 dark:text-zinc-400 transition-colors"
              title="GitHub Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 3. GRID LAYOUT (Default 2-Column Product Cards)                          */
  /* ========================================================================= */
  return (
    <div className="p-6 flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm h-full hover:border-blue-500/30 transition-all duration-200 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {td(project.badge, project.badge_en)}
          </span>

          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Code GitHub pour ${project.title}`}
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visiter ${project.title}`}
                className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
                title="Démo"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
            {td(project.subtitle, project.subtitle_en)}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {td(project.description, project.description_en)}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.securityPoints && project.securityPoints.length > 0 && (
        <div className="pt-4 mt-5 border-t border-zinc-200 dark:border-zinc-800/60 space-y-1.5">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>{locale === "fr" ? "Sécurité & Robustesse" : "Security Architecture"}</span>
          </div>
          <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {project.securityPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-blue-500 mt-0.5">›</span>
                <span>{td(point, project.securityPoints_en?.[idx])}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
