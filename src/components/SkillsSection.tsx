"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import type { SkillCategory, SecuritySkill } from "@/lib/content";

interface SkillsSectionProps {
  skills: SkillCategory[];
  securitySkills?: SecuritySkill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const { locale, td } = useLanguage();

  const categories = [
    {
      title: locale === "fr" ? "Cybersécurité" : "Cybersecurity",
      items: ["OWASP", "Pentest", "Cryptography", "Zero Trust", "CTF"],
    },
    {
      title: "Backend",
      items: ["Node.js", "PostgreSQL", "REST APIs", "Supabase", "Prisma"],
    },
    {
      title: "Frontend",
      items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: locale === "fr" ? "Systèmes" : "Systems",
      items: ["Linux", "Docker", "Git", "CI/CD", "Shell"],
    },
  ];

  // Try to pull items from actual data
  const resolvedCategories = categories.map((cat) => {
    const match = skills.find(
      (s) =>
        s.title?.toLowerCase().includes(cat.title.toLowerCase()) ||
        s.title_en?.toLowerCase().includes(cat.title.toLowerCase())
    );
    return {
      ...cat,
      items: match?.items || cat.items,
    };
  });

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-zinc-50/50 dark:bg-zinc-900/30"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          {locale === "fr" ? "Compétences" : "Skills"}
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          {resolvedCategories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 font-mono"
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
