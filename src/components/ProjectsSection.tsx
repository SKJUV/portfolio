"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import ProjectCard from "./ProjectCard";
import type { PortfolioData } from "@/lib/admin-types";

export default function ProjectsSection({ data }: { data: PortfolioData }) {
  const { projects } = data as unknown as { projects: PortfolioData["projects"] };
  const { t } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.05);

  return (
    <section id="projects" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div ref={headerRef} className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">💼 {t("section.projects")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("section.projects.desc")}
          </p>
        </div>

        <div className="scroll-fade-container">
          <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
            {projects.map((project) => (
              <div key={project.id} className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
