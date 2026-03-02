"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Project } from "@/lib/types";

const badgeStyles: Record<Project["badgeType"], string> = {
  security: "bg-primary/15 text-primary",
  education: "bg-accent/15 text-accent",
  university: "bg-destructive/15 text-destructive",
  academic: "bg-muted/50 text-muted-foreground",
};

export default function ProjectCard({ project }: { project: Project }) {
  const { td } = useLanguage();

  return (
    <div className="flex flex-col p-5 glass-card rounded-2xl">
      {/* Image du projet si disponible */}
      {project.imageUrl && (
        <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden bg-muted/30">
          <Image
            src={project.imageUrl}
            alt={td(project.title, project.title_en)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`inline-block text-xs px-2.5 py-1 rounded-lg font-medium ${badgeStyles[project.badgeType]}`}
        >
          {td(project.badge, project.badge_en)}
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

      <h3 className="font-semibold mb-1">{td(project.title, project.title_en)}</h3>
      <p className="text-sm text-primary mb-2">{td(project.subtitle, project.subtitle_en)}</p>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{td(project.description, project.description_en)}</p>

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
          {project.securityPoints.map((point, idx) => (
            <li key={point} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary">▸</span>
              <span>{td(point, project.securityPoints_en?.[idx])}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
