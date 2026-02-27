"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
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

// ============================================
// Fallback local (utilisé si Gemini non dispo)
// ============================================
function generateLocalResponse(question: string, data: ChatData, fallbackMessage: string, customResponses: { keywords: string[]; response: string; enabled: boolean }[]): string {
  const { projects, skillCategories, securitySkills, profileCategories, terminalLines } = data;
  const q = question.toLowerCase().trim();

  for (const cr of customResponses) {
    if (!cr.enabled) continue;
    if (cr.keywords.some((kw) => q.includes(kw.toLowerCase()))) {
      return cr.response;
    }
  }

  const offTopicPatterns = [/\b(météo|weather|meteo)\b/, /\b(politique|politic)\b/, /\b(cuisine|recipe|recette)\b/, /\b(sport|football|basket)\b/, /\b(musique|music)\b/, /\b(film|movie|série|series)\b/, /\b(jeu|game|gaming)\b/];
  if (offTopicPatterns.some((p) => p.test(q))) return fallbackMessage;

  if (/^(salut|hello|hi|hey|bonjour|coucou|yo|bonsoir)/i.test(q)) {
    return "Bonjour ! 👋 Je suis l'assistant IA de Juvénal SINENG KENGNI. Posez-moi des questions sur ses compétences, projets, ou parcours !";
  }

  if (/qui (es[t\-]|est)/.test(q) || /présent/.test(q) || /c'est qui/.test(q) || /who (is|are)/.test(q)) {
    return "Juvénal SINENG KENGNI (SKJUV) est un développeur Full-Stack passionné par la cybersécurité 🛡️. Ses spécialités : JWT, RBAC, OWASP Top 10, Docker Hardening.";
  }

  if (/contact|email|mail|linkedin|joindre/.test(q)) {
    return "📬 Contact :\n• Email : sinengjuvenal@gmail.com\n• GitHub : github.com/SKJUV\n• LinkedIn : linkedin.com/in/juvenal-sineng-kengni";
  }

  if (/projet|project|réalis|travaux|works/.test(q)) {
    return `Projets de Juvénal :\n${projects.map((p) => `• **${p.title}** — ${p.subtitle}`).join("\n")}\n\nDemandez des détails sur un projet !`;
  }

  for (const project of projects) {
    if (q.includes(project.title.toLowerCase()) || q.includes(project.id.toLowerCase())) {
      return `**${project.title}** — ${project.subtitle}\n${project.description}\nStack : ${project.stack.join(", ")}\n🔗 ${project.githubUrl}`;
    }
  }

  if (/sécurité|security|sécu|cyber|owasp|hack|pentest/.test(q)) {
    return `Sécurité (passion #1) :\n\n${securitySkills.map((s) => `${s.icon} **${s.title}** : ${s.description}`).join("\n")}`;
  }

  if (/compétence|skill|technolog|stack|lang|maîtrise/.test(q)) {
    return `Compétences :\n\n${skillCategories.map((c) => `${c.icon} **${c.title}** : ${c.items.slice(0, 6).join(", ")}...`).join("\n")}`;
  }

  if (/linux|manjaro|zorin|système|system|terminal|os/.test(q)) {
    const points = [...(profileCategories.find((c) => c.title.includes("Linux"))?.points ?? []), ...(profileCategories.find((c) => c.title.includes("Windows"))?.points ?? [])];
    return `🐧 Systèmes :\n${points.map((p) => `• ${p}`).join("\n")}`;
  }

  if (/niveau|level|expérience|experience|parcours/.test(q)) {
    const levelLine = terminalLines.find((l) => l.command.includes("LEVEL"));
    return `📈 ${levelLine?.output ?? "Intermédiaire en progression rapide"}`;
  }

  if (/github|repo|code source/.test(q)) return "🔗 GitHub de Juvénal : https://github.com/SKJUV";

  if (/que (peux|sais|peut)|what can you|aide|help/.test(q)) {
    return "Je peux vous renseigner sur :\n• 👤 Qui est Juvénal\n• 🛡️ Cybersécurité\n• 💻 Projets\n• ⚙️ Stack technique\n• 📬 Contact\n\nPosez votre question !";
  }

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
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // If chatbot is disabled, don't render
  if (settings && !settings.enabled) {
    return null;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Tenter d'abord avec Gemini
    if (useGemini) {
      try {
        // Envoyer l'historique (sans le welcome message) pour le contexte conversationnel
        const history = messages.slice(1).concat(userMessage);

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: history.slice(-10), // Limiter à 10 derniers messages
          }),
        });

        const data = await res.json();

        if (res.ok && data.response) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
          setIsTyping(false);
          return;
        }

        // Si Gemini signale un fallback, désactiver pour cette session
        if (data.fallback) {
          console.warn("Gemini non disponible, basculement sur le mode local");
          setUseGemini(false);
        }
      } catch {
        console.warn("Erreur réseau Gemini, basculement sur le mode local");
        setUseGemini(false);
      }
    }

    // Fallback local (pattern matching)
    const response = generateLocalResponse(
      trimmed,
      chatData,
      settings?.fallbackMessage || "Je suis spécialisé uniquement sur Juvénal SINENG KENGNI.",
      settings?.customResponses || []
    );
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  }, [input, isTyping, useGemini, messages, chatData, settings]);
  /* eslint-enable react-hooks/rules-of-hooks */

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
              <p className="text-sm font-semibold flex items-center gap-1.5">
                {settings?.botName || "Assistant IA"}
                {useGemini && <Sparkles className="h-3.5 w-3.5 text-primary" />}
              </p>
              <p className="text-xs text-muted-foreground">
                {useGemini ? "Propulsé par Gemini AI" : settings?.botDescription || "Tout savoir sur Juvénal"}
              </p>
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
                disabled={!input.trim() || isTyping}
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
