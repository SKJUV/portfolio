"use client";

import { Github, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { td, locale } = useLanguage();
  const isFeatured = project.layout === "featured" || project.featured;
  const isCompact = project.layout === "compact";

  /* ===== Featured: clean horizontal layout ===== */
  if (isFeatured) {
    return (
      <div className="p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
            {td(project.badge, project.badge_en)}
          </span>
          {project.liveUrl && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {td(project.subtitle, project.subtitle_en)}
          </p>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          {td(project.description, project.description_en)}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              {locale === "fr" ? "Voir le site" : "Live Demo"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ===== Compact: single-line ribbon ===== */
  if (isCompact) {
    return (
      <div className="py-3 px-4 rounded-lg border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {td(project.title, project.title_en)}
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {td(project.subtitle, project.subtitle_en)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 font-mono"
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
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ===== Grid: clean card ===== */
  return (
    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 h-full flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            {td(project.badge, project.badge_en)}
          </span>
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            {td(project.subtitle, project.subtitle_en)}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
