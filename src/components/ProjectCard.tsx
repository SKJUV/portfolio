import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

const badgeStyles: Record<Project["badgeType"], string> = {
  security: "bg-primary/15 text-primary border-primary/20",
  education: "bg-accent/15 text-accent border-accent/20",
  university: "bg-destructive/15 text-destructive border-destructive/20",
  academic: "bg-muted text-muted-foreground border-border",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col p-5 bg-card border border-border rounded-lg transition-all duration-200 hover:border-primary hover:-translate-y-1">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded border ${badgeStyles[project.badgeType]}`}
        >
          {project.badge}
        </span>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
          aria-label="GitHub"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <h3 className="font-semibold mb-1">{project.title}</h3>
      <p className="text-sm text-primary mb-2">{project.subtitle}</p>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Security points */}
      {project.securityPoints.length > 0 && (
        <ul className="space-y-0.5">
          {project.securityPoints.map((point) => (
            <li key={point} className="text-xs text-muted-foreground flex items-start gap-1">
              <span>🔒</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
