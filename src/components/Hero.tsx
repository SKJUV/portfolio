import { Github, Mail, ExternalLink } from "lucide-react";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              SINENG KENGNI <span className="text-primary">Juvénal</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              🛡️ Cybersecurity Enthusiast &amp; Full-Stack Developer
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Passionné par la sécurité applicative, l&apos;architecture sécurisée et le développement
              de systèmes robustes pour l&apos;Afrique francophone.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Voir mes projets
            </a>
            <a
              href="https://github.com/SKJUV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
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
