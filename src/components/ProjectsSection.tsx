"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/content";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { locale } = useLanguage();

  const featuredProject = projects.find((p) => p.layout === "featured" || p.featured);
  const gridProjects = projects.filter((p) => p.layout === "grid" || (!p.layout && !p.featured));
  const compactProjects = projects.filter((p) => p.layout === "compact");

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeader
          badge={locale === "fr" ? "PROJETS SÉLECTIONNÉS" : "CURATED WORK"}
          title={
            locale === "fr"
              ? "Réalisations Concrètes & Sécurisées"
              : "Shipped & Production-Grade Work"
          }
          description={
            locale === "fr"
              ? "Solutions complètes alliant architecture logicielle, protection des données et intégration IA."
              : "Full-stack and desktop solutions engineered with data security, system architecture, and AI integration."
          }
        />

        <div className="space-y-8">
          {/* 1. Flagship Hero Project (Full-Width) */}
          {featuredProject && (
            <div>
              <ProjectCard project={featuredProject} />
            </div>
          )}

          {/* 2. Main Web & AI Applications (2-Columns Grid) */}
          {gridProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {gridProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* 3. Specialized & Desktop Systems (Compact Horizontal Ribbons) */}
          {compactProjects.length > 0 && (
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pb-1">
                <span>{locale === "fr" ? "Applications Systèmes & Desktop" : "System & Desktop Applications"}</span>
              </div>
              <div className="space-y-3">
                {compactProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
