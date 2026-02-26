import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 bg-mesh">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">📬 Contact</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Intéressé par une collaboration ? Parlons sécurité !
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
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
            href="mailto:sinengjuvenal@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all glow-primary"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/juvenal-sineng-kengni"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-primary/10 transition-all"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>© 2026 SINENG KENGNI Juvénal</p>
          <p className="font-mono text-xs opacity-60">github.com/SKJUV</p>
        </div>
      </div>
    </footer>
  );
}
