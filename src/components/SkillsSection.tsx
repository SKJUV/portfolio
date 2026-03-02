"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function SkillsSection({ data }: { data: PortfolioData }) {
  const { skillCategories } = data as unknown as { skillCategories: PortfolioData["skillCategories"] };
  const { t, td } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="skills" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div ref={headerRef} className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">🧠 {t("section.skills")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("section.skills.desc")}
          </p>
        </div>

        <div className="scroll-fade-container">
          <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
          {skillCategories.map((category, i) => (
            <div key={i} className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto p-5 glass-card rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{td(category.title, category.title_en)}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-lg"
                  >
                    {td(item)}
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
