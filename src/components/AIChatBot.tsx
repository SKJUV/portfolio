"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import type { PortfolioData } from "@/lib/admin-types";
import type { Project, SecuritySkill, SkillCategory, ProfileCategory } from "@/lib/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatData {
  projects: Project[];
  skillCategories: SkillCategory[];
  securitySkills: SecuritySkill[];
  profileCategories: ProfileCategory[];
  terminalLines: { command: string; output: string }[];
}

function generateResponse(question: string, data: ChatData, fallbackMessage: string, customResponses: { keywords: string[]; response: string; enabled: boolean }[]): string {
  const { projects, skillCategories, securitySkills, profileCategories, terminalLines } = data;
  const q = question.toLowerCase().trim();

  // Check custom responses first (admin-defined)
  for (const cr of customResponses) {
    if (!cr.enabled) continue;
    if (cr.keywords.some((kw) => q.includes(kw.toLowerCase()))) {
      return cr.response;
    }
  }

  // Refuse off-topic questions
  const offTopicPatterns = [
    /\b(météo|weather|meteo)\b/,
    /\b(politique|politic)\b/,
    /\b(cuisine|recipe|recette)\b/,
    /\b(sport|football|basket)\b/,
    /\b(musique|music)\b/,
    /\b(film|movie|série|series)\b/,
    /\b(jeu|game|gaming)\b/,
  ];
  if (offTopicPatterns.some((p) => p.test(q))) {
    return fallbackMessage;
  }

  // Greeting
  if (/^(salut|hello|hi|hey|bonjour|coucou|yo|bonsoir)/i.test(q)) {
    return "Bonjour ! 👋 Je suis l'assistant IA de Juvénal SINENG KENGNI. Posez-moi des questions sur ses compétences, projets, ou parcours !";
  }

  // Who is he / presentation
  if (
    /qui (es[t\-]|est)/.test(q) ||
    /présent/.test(q) ||
    /c'est qui/.test(q) ||
    /who (is|are)/.test(q) ||
    /tell me about/.test(q) ||
    /parle.*(moi|nous).*de (toi|lui|juvenal|juvénal)/.test(q)
  ) {
    return "Juvénal SINENG KENGNI (SKJUV) est un développeur Full-Stack passionné par la cybersécurité 🛡️. Il développe des systèmes robustes et sécurisés pour l'Afrique francophone. Ses spécialités : JWT, RBAC, OWASP Top 10, Docker Hardening, et bien plus !";
  }

  // Contact
  if (/contact|email|mail|linkedin|joindre|écrire/.test(q)) {
    return "📬 Vous pouvez contacter Juvénal par :\n• Email : sinengjuvenal@gmail.com\n• GitHub : github.com/SKJUV\n• LinkedIn : linkedin.com/in/juvenal-sineng-kengni";
  }

  // Projects
  if (/projet|project|réalis|portfolio|travaux|works/.test(q)) {
    const projectList = projects
      .map((p) => `• **${p.title}** — ${p.subtitle}`)
      .join("\n");
    return `Voici les projets de Juvénal :\n${projectList}\n\nVous pouvez me demander des détails sur un projet spécifique !`;
  }

  // Specific project lookup
  for (const project of projects) {
    if (
      q.includes(project.title.toLowerCase()) ||
      q.includes(project.id.toLowerCase())
    ) {
      const stackStr = project.stack.join(", ");
      const secStr =
        project.securityPoints.length > 0
          ? `\nSécurité : ${project.securityPoints.join(", ")}`
          : "";
      return `**${project.title}** — ${project.subtitle}\n${project.description}\n\nStack : ${stackStr}${secStr}\n🔗 ${project.githubUrl}`;
    }
  }

  // Security skills
  if (/sécurité|security|sécu|cyber|owasp|hack|pentest/.test(q)) {
    const skills = securitySkills
      .map((s) => `${s.icon} **${s.title}** : ${s.description}`)
      .join("\n");
    return `La sécurité est la passion #1 de Juvénal ! Voici ses domaines :\n\n${skills}`;
  }

  // Skills / competences
  if (/compétence|skill|technolog|stack|lang|maîtrise|connai/.test(q)) {
    const cats = skillCategories
      .map((c) => `${c.icon} **${c.title}** : ${c.items.slice(0, 6).join(", ")}...`)
      .join("\n");
    return `Voici les compétences de Juvénal :\n\n${cats}`;
  }

  // Specific skill category lookup
  for (const cat of skillCategories) {
    const catTitle = cat.title.toLowerCase();
    if (q.includes(catTitle) || cat.items.some((i) => q.includes(i.toLowerCase()))) {
      return `${cat.icon} **${cat.title}**\n${cat.items.join(", ")}`;
    }
  }

  // Backend
  if (/backend|serveur|server|django|python|java|php|node/.test(q)) {
    const backend = skillCategories.find((c) => c.title === "Backend");
    return backend
      ? `⚙️ Compétences Backend de Juvénal :\n${backend.items.join(", ")}`
      : "Juvénal maîtrise plusieurs technologies backend dont Python, Django, Java, PHP, Node.js.";
  }

  // Frontend
  if (/frontend|front|react|next|tailwind|ui|interface/.test(q)) {
    const frontend = skillCategories.find((c) => c.title === "Frontend");
    return frontend
      ? `🎨 Compétences Frontend de Juvénal :\n${frontend.items.join(", ")}`
      : "Juvénal travaille avec React, Next.js, TypeScript, Tailwind CSS et shadcn/ui.";
  }

  // DevOps
  if (/devops|docker|infra|deploy|déploiement|ci|cd/.test(q)) {
    const devops = skillCategories.find((c) => c.title.includes("DevOps"));
    return devops
      ? `🐳 Compétences DevOps de Juvénal :\n${devops.items.join(", ")}`
      : "Juvénal utilise Docker, Docker Compose, Gunicorn, Sentry et des builds multi-stage.";
  }

  // Linux / systems
  if (/linux|manjaro|zorin|système|system|terminal|os/.test(q)) {
    const linux = profileCategories.find((c) => c.title.includes("Linux"));
    const win = profileCategories.find((c) => c.title.includes("Windows"));
    const points = [
      ...(linux?.points ?? []),
      ...(win?.points ?? []),
    ];
    return `🐧 Systèmes utilisés par Juvénal :\n${points.map((p) => `• ${p}`).join("\n")}`;
  }

  // AI & Data
  if (/\b(ia|ai|intelligence|data|machine|ml|kaggle|genkit)\b/.test(q)) {
    const ai = skillCategories.find((c) => c.title.includes("IA"));
    return ai
      ? `🤖 Compétences IA & Data de Juvénal :\n${ai.items.join(", ")}`
      : "Juvénal utilise Google Genkit AI, Firebase AI, Kaggle et travaille sur des pipelines ML.";
  }

  // Tools
  if (/outil|tool|git|vscode|vs code|prisma/.test(q)) {
    const tools = profileCategories.find((c) => c.title.includes("Outils"));
    return tools
      ? `🛠️ Outils de développement de Juvénal :\n${tools.points.map((p) => `• ${p}`).join("\n")}`
      : "Juvénal utilise Git CLI, VS Code, GitHub Education Pack et Prisma ORM.";
  }

  // Level / experience
  if (/niveau|level|expérience|experience|parcours|formation/.test(q)) {
    const levelLine = terminalLines.find((l) => l.command.includes("LEVEL"));
    return `📈 ${levelLine?.output ?? "Intermédiaire en progression rapide"}\nJuvénal est un constructeur de compétences passionné qui progresse constamment dans la cybersécurité et le développement Full-Stack.`;
  }

  // GitHub
  if (/github|repo|code source/.test(q)) {
    return "🔗 Le profil GitHub de Juvénal : https://github.com/SKJUV\nVous y trouverez tous ses projets open-source !";
  }

  // What can you do
  if (/que (peux|sais|peut)|what can you|aide|help/.test(q)) {
    return "Je peux vous renseigner sur :\n• 👤 Qui est Juvénal SINENG KENGNI\n• 🛡️ Ses compétences en cybersécurité\n• 💻 Ses projets (EduConverse, EduAfrique, HRMS...)\n• ⚙️ Son stack technique\n• 📬 Comment le contacter\n• 🐧 Ses systèmes et outils\n\nPosez-moi une question !";
  }

  // Default fallback
  return fallbackMessage;
}

export default function AIChatBot({ data }: { data: PortfolioData }) {
  const settings = data.chatBotSettings;
  
  const chatData: ChatData = {
    projects: data.projects,
    skillCategories: data.skillCategories,
    securitySkills: data.securitySkills,
    profileCategories: data.profileCategories,
    terminalLines: data.terminalLines,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: settings?.welcomeMessage || "Bonjour ! 👋 Je suis l'assistant IA de Juvénal. Posez-moi vos questions sur son parcours, ses compétences ou ses projets !",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // If chatbot is disabled, don't render
  if (settings && !settings.enabled) {
    return null;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate a small delay for natural feel
    setTimeout(() => {
      const response = generateResponse(
        trimmed,
        chatData,
        settings?.fallbackMessage || "Je suis spécialisé uniquement sur Juvénal SINENG KENGNI.",
        settings?.customResponses || []
      );
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 glow-primary"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat IA"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl glass shadow-2xl overflow-hidden"
          style={{ height: "min(500px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-primary/10 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{settings?.botName || "Assistant IA"}</p>
              <p className="text-xs text-muted-foreground">{settings?.botDescription || "Tout savoir sur Juvénal"}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border/50 px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={settings?.inputPlaceholder || "Posez une question sur Juvénal..."}
                className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
