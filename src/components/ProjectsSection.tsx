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
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {locale === "fr" ? "Projets" : "Projects"}
          </p>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {locale === "fr"
              ? "Réalisations sélectionnées"
              : "Selected work"}
          </h2>
        </div>

        <div className="space-y-6">
          {featuredProject && <ProjectCard project={featuredProject} />}

          {gridProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {gridProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {compactProjects.length > 0 && (
            <div className="space-y-2 pt-4">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-1">
                {locale === "fr"
                  ? "Applications Desktop"
                  : "Desktop Applications"}
              </p>
              {compactProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
