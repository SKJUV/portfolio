"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import type { SkillCategory, SecuritySkill } from "@/lib/content";

interface SkillsSectionProps {
  skills: SkillCategory[];
  securitySkills?: SecuritySkill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { locale } = useLanguage();

  const matrix = [
    {
      index: "01",
      domain: locale === "fr" ? "SÉCURITÉ & AUDIT" : "SECURITY & AUDITING",
      tagline: locale === "fr" ? "Défense en profondeur & modélisation des menaces" : "Defense in depth & threat modeling",
      items: [
        "OWASP Top 10",
        "Penetration Testing",
        "Threat Hunting (IBM)",
        "Applied Cryptography",
        "Zero Trust Architecture",
        "CTF & Vulnerability Research",
        "Security Headers (CSP/HSTS)",
      ],
    },
    {
      index: "02",
      domain: locale === "fr" ? "INGÉNIERIE FRONTEND" : "FRONTEND ENGINEERING",
      tagline: locale === "fr" ? "Interfaces web haute performance & réactives" : "High-performance responsive web interfaces",
      items: [
        "Next.js 15 App Router",
        "TypeScript Strict",
        "React 18",
        "Tailwind CSS",
        "UI State Management",
        "Responsive Grid Systems",
        "Web Vitals Optimization",
      ],
    },
    {
      index: "03",
      domain: locale === "fr" ? "BACKEND & DONNÉES" : "BACKEND & PERSISTENCE",
      tagline: locale === "fr" ? "APIs durcies & modélisation relationnelle" : "Hardened APIs & relational modeling",
      items: [
        "Node.js Runtime",
        "Python (REST & JSON Parsing)",
        "PostgreSQL",
        "MySQL Workbench (EER Modeling)",
        "Supabase Row Level Security",
        "PHP & Prepared Queries",
        "Edge Middleware & HMAC",
      ],
    },
    {
      index: "04",
      domain: locale === "fr" ? "INFRASTRUCTURE & OUTILS" : "INFRASTRUCTURE & RUNTIME",
      tagline: locale === "fr" ? "Conteneurs, systèmes Linux & cloud sécurisé" : "Containers, Linux systems & secured cloud",
      items: [
        "Linux OS Hardening",
        "Docker Containerization",
        "Git & Release Management",
        "Google Cloud Fundamentals",
        "CI/CD Pipelines",
        "Bash & Shell Scripting",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            02 // CAPABILITY MATRIX
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Directory Matrix Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md">
          {matrix.map((row) => (
            <div
              key={row.index}
              className="p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-start hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition-colors"
            >
              {/* Domain & Meta (4 cols) */}
              <div className="md:col-span-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    //{row.index}
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    {row.domain}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {row.tagline}
                </p>
              </div>

              {/* Skills Tags (8 cols) */}
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {row.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-2.5 py-1 rounded border border-zinc-200/90 dark:border-zinc-800/90 bg-white/80 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
