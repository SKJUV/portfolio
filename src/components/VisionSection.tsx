import type { PortfolioData } from "@/lib/admin-types";

const visionItems = [
  {
    icon: "🔮",
    title: "Vision Technique",
    points: [
      "Construire des systèmes sécurisés et scalables pour l'Afrique francophone",
      "Démocratiser l'accès aux technologies modernes via l'open-source",
      "Créer des solutions qui résolvent de vrais problèmes locaux",
    ],
  },
  {
    icon: "🛡️",
    title: "Passion Cybersécurité",
    points: [
      "Approfondir l'audit de sécurité et le pentesting",
      "Maîtriser les standards OWASP, ISO 27001 et NIST",
      "Sensibiliser les développeurs africains aux bonnes pratiques sécurité",
    ],
  },
  {
    icon: "🤖",
    title: "Intelligence Artificielle",
    points: [
      "Explorer les frontières de l'IA générative et des LLMs",
      "Intégrer l'IA dans des applications pratiques (éducation, santé)",
      "Contribuer à la recherche en NLP pour les langues africaines",
    ],
  },
  {
    icon: "🌍",
    title: "Impact Social",
    points: [
      "Développer des plateformes éducatives accessibles à tous",
      "Encourager la formation technique des jeunes développeurs",
      "Bâtir un écosystème tech fort en Afrique francophone",
    ],
  },
  {
    icon: "🚀",
    title: "Objectifs Personnels",
    points: [
      "Devenir expert en architecture logicielle sécurisée",
      "Obtenir des certifications reconnues (GCP, AWS, CEH)",
      "Lancer des projets open-source à impact communautaire",
    ],
  },
  {
    icon: "💡",
    title: "Philosophie de Travail",
    points: [
      "\"Code propre, architecture claire, sécurité d'abord\"",
      "Apprentissage continu et partage de connaissances",
      "Chaque ligne de code doit avoir un but et une intention",
    ],
  },
];

export default function VisionSection({ data }: { data: PortfolioData }) {
  void data; // utilisé pour la compatibilité avec le système de sections dynamiques

  return (
    <section id="vision" className="py-16 px-4 bg-mesh">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold">🔮 Vision et Passions</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Ce qui me motive au quotidien : construire, sécuriser, innover et impacter positivement
            l&apos;écosystème tech africain.
          </p>
          <div className="glass rounded-xl px-4 py-3 glow-primary">
            <p className="font-mono text-sm text-primary">
              <span className="text-muted-foreground">$ echo </span>&quot;La technologie n&apos;a de sens que quand elle sert une vision.&quot;
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visionItems.map((item, i) => (
            <div key={i} className="p-5 glass-card rounded-2xl">
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
    </section>
  );
}
