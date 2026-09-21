"use client";

import { Github, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Badge } from "./ui/Badge";
import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { td, locale } = useLanguage();

  return (
    <div className="p-6 flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 card-hover shadow-sm h-full">
      <div className="space-y-4">
        {/* Card Header: Badge & External Links */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="blue" size="sm">
            {td(project.badge, project.badge_en)}
          </Badge>

          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Code source GitHub pour ${project.title}`}
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
                className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-500/20 transition-colors"
                title="Démo en direct"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {td(project.title, project.title_en)}
          </h3>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
            {td(project.subtitle, project.subtitle_en)}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {td(project.description, project.description_en)}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Security Features */}
      {project.securityPoints && project.securityPoints.length > 0 && (
        <div className="pt-4 mt-5 border-t border-zinc-200 dark:border-zinc-800/60 space-y-2">
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{locale === "fr" ? "Points clés sécurité" : "Security Architecture"}</span>
          </span>
          <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            {project.securityPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-blue-500 mt-0.5 font-bold">›</span>
                <span>{td(point, project.securityPoints_en?.[idx])}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
