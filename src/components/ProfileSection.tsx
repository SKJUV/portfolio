import type { PortfolioData } from "@/lib/admin-types";

export default function ProfileSection({ data }: { data: PortfolioData }) {
  const { profileCategories } = data as unknown as { profileCategories: PortfolioData["profileCategories"] };

  return (
    <section id="profile" className="py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">👤 Profil Informatique</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Développeur Full-Stack en évolution avec orientation : Sécurité, Data, Bots &amp; APIs, Linux.
          </p>
          <div className="glass rounded-xl px-4 py-3 glow-primary">
            <p className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$ echo </span>&quot;Tu n&apos;es pas un simple étudiant. Tu es un constructeur de compétences techniques réelles.&quot;
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {profileCategories.map((category, i) => (
            <div key={i} className="p-5 glass-card rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {category.points.map((point, j) => (
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
    </section>
  );
}
