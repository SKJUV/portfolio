"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function SecuritySection({ data }: { data: PortfolioData }) {
  const { securitySkills } = data as unknown as { securitySkills: PortfolioData["securitySkills"] };
  const { t, td } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="security" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div ref={headerRef} className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">🔒 {t("section.security")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("section.security.desc")}
          </p>
        </div>

        <div className="scroll-fade-container">
          <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
          {securitySkills.map((skill, i) => (
            <div
              key={i}
              className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto p-5 glass-card rounded-2xl"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <h3 className="font-semibold mb-1">{td(skill.title)}</h3>
              <p className="text-sm text-muted-foreground mb-3">{td(skill.description)}</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
