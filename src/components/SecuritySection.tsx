import { securitySkills } from "@/lib/data";

export default function SecuritySection() {
  return (
    <section id="security" className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">🔒 Pratiques Sécurité</h2>
          <p className="text-muted-foreground">
            La sécurité n&apos;est pas une option — c&apos;est une priorité dans chaque ligne de code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {securitySkills.map((skill, i) => (
            <div
              key={i}
              className="p-5 bg-card border border-border rounded-lg transition-all duration-200 hover:border-primary hover:-translate-y-1"
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <h3 className="font-semibold mb-1">{skill.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
              <div className="flex flex-wrap gap-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded"
                  >
                    {tag}
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
