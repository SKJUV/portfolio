"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/content";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { locale } = useLanguage();

  const featuredProject = projects.find(
    (p) => p.layout === "featured" || p.featured
  );
  const gridProjects = projects.filter(
    (p) => p.layout === "grid" || (!p.layout && !p.featured)
  );
  const compactProjects = projects.filter((p) => p.layout === "compact");

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            03 // SELECTED WORK & ARTIFACTS
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="space-y-6">
          {/* Featured Architecture Project */}
          {featuredProject && (
            <ProjectCard project={featuredProject} index="01" />
          )}

          {/* Grid Projects */}
          {gridProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {gridProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={`0${idx + 2}`}
                />
              ))}
            </div>
          )}

          {/* Compact / Desktop Utilities */}
          {compactProjects.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {locale === "fr" ? "// LOGICIELS DESKTOP & SYSTÈMES" : "// DESKTOP & SYSTEM UTILITIES"}
                </span>
              </div>
              <div className="space-y-2">
                {compactProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={`SYS_0${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
