"use client";

import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/content";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: locale === "fr" ? "Tous les projets" : "All Projects" },
    { id: "security", label: locale === "fr" ? "Sécurité & Full-Stack" : "Security & Full-Stack" },
    { id: "ai", label: locale === "fr" ? "IA & Systèmes" : "AI & Systems" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "security") {
      return (
        project.badgeType === "security" ||
        project.securityPoints.length > 2 ||
        project.stack.some((s) => /security|auth|supabase|linux/i.test(s))
      );
    }
    if (filter === "ai") {
      return (
        project.stack.some((s) => /gemini|ai|python|data|bot/i.test(s)) ||
        project.badge.toLowerCase().includes("ia")
      );
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeader
          badge={locale === "fr" ? "RÉALISATIONS" : "FEATURED WORK"}
          title={
            locale === "fr"
              ? "Projets Concrets & Sécurisés"
              : "Shipped & Secure Projects"
          }
          description={
            locale === "fr"
              ? "Chaque projet est conçu avec une attention méticuleuse portée à la sécurité, l'architecture logicielle et l'expérience utilisateur."
              : "Each project is engineered with meticulous care for application security, software architecture, and user experience."
          }
        />

        {/* Filter pills */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 gap-1">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  filter === opt.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
