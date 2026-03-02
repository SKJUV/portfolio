"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function ProfileSection({ data }: { data: PortfolioData }) {
  const { profileCategories } = data as unknown as { profileCategories: PortfolioData["profileCategories"] };
  const { t, td } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <section id="profile" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div ref={headerRef} className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">👤 {t("section.profile")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("profile.desc")}
          </p>
          <div className="glass rounded-xl px-4 py-3 glow-primary">
            <p className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$ echo </span>&quot;{t("profile.terminalQuote")}&quot;
            </p>
          </div>
        </div>

        <div className="scroll-fade-container">
          <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
          {profileCategories.map((category, i) => (
            <div key={i} className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto p-5 glass-card rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{td(category.title, category.title_en)}</h3>
              </div>
              <ul className="space-y-1.5">
                {category.points.map((point, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>{td(point, category.points_en?.[j])}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
