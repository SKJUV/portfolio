import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

const badgeStyles: Record<Project["badgeType"], string> = {
  security: "bg-primary/15 text-primary",
  education: "bg-accent/15 text-accent",
  university: "bg-destructive/15 text-destructive",
  academic: "bg-muted/50 text-muted-foreground",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col p-5 glass-card rounded-2xl">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`inline-block text-xs px-2.5 py-1 rounded-lg font-medium ${badgeStyles[project.badgeType]}`}
        >
          {project.badge}
        </span>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors shrink-0 p-1 rounded-lg hover:bg-primary/10"
          aria-label="GitHub"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <h3 className="font-semibold mb-1">{project.title}</h3>
      <p className="text-sm text-primary mb-2">{project.subtitle}</p>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Security points */}
      {project.securityPoints.length > 0 && (
        <ul className="space-y-1">
          {project.securityPoints.map((point) => (
            <li key={point} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
