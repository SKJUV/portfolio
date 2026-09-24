"use client";

import { Github, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
  index?: string;
}

export default function ProjectCard({ project, index = "01" }: ProjectCardProps) {
  const { td, locale } = useLanguage();
  const isFeatured = project.layout === "featured" || project.featured;
  const isCompact = project.layout === "compact";

  /* ===== Featured: Architectural Breakdown Card ===== */
  if (isFeatured) {
    return (
      <div className="p-6 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              //{index}
            </span>
            {project.badge && (
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                {td(project.badge, project.badge_en)}
              </span>
            )}
          </div>

          {project.liveUrl && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>LIVE_DEPLOYMENT</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {td(project.description, project.description_en)}
          </p>
        </div>

        {/* Security Architecture Points */}
        {project.securityPoints && project.securityPoints.length > 0 && (
          <div className="p-4 rounded border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
            <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              SECURITY ARCHITECTURE CONTROLS
            </span>
            <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              {(locale === "fr" ? project.securityPoints : (project.securityPoints_en || project.securityPoints)).map(
                (pt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-zinc-400">↳</span>
                    <span>{pt}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Stack & Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                <span>{locale === "fr" ? "Visiter" : "Live Demo"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ===== Compact: Minimal Strip ===== */
  if (isCompact) {
    return (
      <div className="p-4 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            //{index}
          </span>
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {td(project.title, project.title_en)}
            </h4>
            <p className="text-[11px] text-zinc-500 truncate mt-0.5">
              {td(project.subtitle, project.subtitle_en)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex gap-1">
            {project.stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500"
              >
                {t}
              </span>
            ))}
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ===== Grid Project Card ===== */
  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            //{index}
          </span>
          {project.badge && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
              {td(project.badge, project.badge_en)}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
            {td(project.subtitle, project.subtitle_en)}
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-500 bg-zinc-50 dark:bg-zinc-900"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono flex items-center gap-1 text-zinc-900 dark:text-white hover:underline"
              >
                <span>Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
