import type { PortfolioData } from "@/lib/admin-types";

export default function SkillsSection({ data }: { data: PortfolioData }) {
  const { skillCategories } = data as unknown as { skillCategories: PortfolioData["skillCategories"] };

  return (
    <section id="skills" className="py-16 px-4 bg-mesh">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">🧠 Compétences</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Un ensemble de compétences techniques orientées sécurité et développement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, i) => (
            <div key={i} className="p-5 glass-card rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-lg"
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
