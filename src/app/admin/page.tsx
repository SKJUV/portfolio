"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Layers,
  Code2,
  Award,
  TrendingUp,
  Eye,
  EyeOff,
  MessageSquare,
} from "lucide-react";
import type { PortfolioData } from "@/lib/admin-types";

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground text-sm">Chargement...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-destructive text-sm">Erreur de chargement des données</div>
    );
  }

  const enabledSections = data.sections.filter((s) => s.enabled).length;
  const totalSections = data.sections.length;
  const unreadMessages = (data.messages || []).filter((m) => !m.read).length;
  const totalMessages = (data.messages || []).length;

  const stats = [
    {
      label: "Projets",
      value: data.projects.length,
      icon: FolderKanban,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Sections",
      value: `${enabledSections}/${totalSections}`,
      icon: Layers,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Technologies",
      value: data.technologies.length,
      icon: Code2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Certifications",
      value: data.certifications.length,
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Messages",
      value: unreadMessages > 0 ? `${unreadMessages} non lu${unreadMessages > 1 ? "s" : ""}` : totalMessages,
      icon: MessageSquare,
      color: unreadMessages > 0 ? "text-red-500" : "text-cyan-500",
      bg: unreadMessages > 0 ? "bg-red-500/10" : "bg-cyan-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d&apos;ensemble de votre portfolio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Sections overview */}
      <div className="admin-card p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Sections du portfolio</h2>
        <div className="space-y-3">
          {data.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{section.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Ordre: {section.order} — {section.component}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {section.enabled ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-500/10 px-2.5 py-1 rounded-lg">
                      <Eye className="h-3 w-3" /> Actif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">
                      <EyeOff className="h-3 w-3" /> Inactif
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Recent projects */}
      <div className="admin-card p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Projets récents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.projects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="px-4 py-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <p className="text-sm font-medium">{project.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{project.subtitle}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
