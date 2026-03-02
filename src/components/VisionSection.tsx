"use client";

import { useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function VisionSection({ data }: { data: PortfolioData }) {
  void data;
  const { t } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.1);

  const visionItems = useMemo(() => [
    { icon: "🔮", title: t("vision.tech.title"), points: [t("vision.tech.0"), t("vision.tech.1"), t("vision.tech.2")] },
    { icon: "🛡️", title: t("vision.cyber.title"), points: [t("vision.cyber.0"), t("vision.cyber.1"), t("vision.cyber.2")] },
    { icon: "🤖", title: t("vision.ai.title"), points: [t("vision.ai.0"), t("vision.ai.1"), t("vision.ai.2")] },
    { icon: "🌍", title: t("vision.impact.title"), points: [t("vision.impact.0"), t("vision.impact.1"), t("vision.impact.2")] },
    { icon: "🚀", title: t("vision.goals.title"), points: [t("vision.goals.0"), t("vision.goals.1"), t("vision.goals.2")] },
    { icon: "💡", title: t("vision.philosophy.title"), points: [t("vision.philosophy.0"), t("vision.philosophy.1"), t("vision.philosophy.2")] },
  ], [t]);

  return (
    <section id="vision" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div ref={headerRef} className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">🔮 {t("section.vision")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            {t("section.vision.desc")}
          </p>
          <div className="glass rounded-xl px-4 py-3 glow-primary">
            <p className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$ echo </span>&quot;{t("vision.terminalQuote")}&quot;
            </p>
          </div>
        </div>

        <div className="scroll-fade-container">
          <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
          {visionItems.map((item, i) => (
            <div key={i} className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto p-5 glass-card rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {item.points.map((point, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    <span>{point}</span>
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
