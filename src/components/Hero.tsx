import { Github, Mail } from "lucide-react";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-4 bg-mesh overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              SINENG KENGNI <span className="text-primary">Juvénal</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              🛡️ Cybersecurity Enthusiast &amp; Full-Stack Developer
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Passionné par la sécurité applicative, l&apos;architecture sécurisée et le développement
              de systèmes robustes pour l&apos;Afrique francophone.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all glow-primary"
            >
              Voir mes projets
            </a>
            <a
              href="https://github.com/SKJUV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
