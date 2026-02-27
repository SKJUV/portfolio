import ProjectCard from "./ProjectCard";
import type { PortfolioData } from "@/lib/admin-types";

export default function ProjectsSection({ data }: { data: PortfolioData }) {
  const { projects } = data as unknown as { projects: PortfolioData["projects"] };

  return (
    <section id="projects" className="py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">💼 Projets</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Des projets concrets avec une approche security-first — uniquement des repos publics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
