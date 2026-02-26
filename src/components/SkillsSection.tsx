import { skillCategories } from "@/lib/data";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">🧠 Compétences</h2>
          <p className="text-muted-foreground">
            Un ensemble de compétences techniques orientées sécurité et développement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <div key={i} className="p-5 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
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
