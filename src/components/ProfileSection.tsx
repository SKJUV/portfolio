import { profileCategories } from "@/lib/data";

export default function ProfileSection() {
  return (
    <section id="profile" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">👤 Profil Informatique</h2>
          <p className="text-muted-foreground">
            Développeur Full-Stack en évolution avec orientation : Sécurité, Data, Bots &amp; APIs, Linux.
          </p>
          <p className="font-mono text-sm text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg">
            &quot;Tu n&apos;es pas un simple étudiant. Tu es un constructeur de compétences techniques réelles.&quot;
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileCategories.map((category, i) => (
            <div key={i} className="p-5 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-1">
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
