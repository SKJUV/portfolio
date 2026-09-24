"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Project, SecuritySkill, SkillCategory, ProfileCategory } from "@/lib/content";

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-xs text-blue-300">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-zinc-100'>$1</strong>")
    .replace(/__(.+?)__/g, "<strong class='font-semibold text-zinc-100'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/(?<![\w])_(.+?)_(?![\w])/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline underline-offset-2 hover:text-blue-300">$1</a>'
    )
    .replace(/^[•\-\*]\s+(.+)$/gm, '<li class="ml-3 list-disc">$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul class="my-1 space-y-1">${match}</ul>`)
    .replace(/\n/g, "<br/>");
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatData {
  projects: Project[];
  skills: SkillCategory[];
  securitySkills: SecuritySkill[];
}

function generateLocalResponse(
  question: string,
  data: ChatData,
  t: (key: string) => string,
  td: (text: string) => string,
  locale: string
): string {
  const { projects, skills, securitySkills } = data;
  const q = question.toLowerCase().trim();

  if (/^(salut|hello|hi|hey|bonjour|coucou|yo|bonsoir)/i.test(q)) {
    return locale === "fr"
      ? "Bonjour ! Je suis l'assistant IA de SINENG KENGNI Juvenal. Comment puis-je vous aider à explorer son travail en cybersécurité et full-stack ?"
      : "Hello! I am SINENG KENGNI Juvenal's AI assistant. How can I help you explore his work in cybersecurity and full-stack engineering?";
  }

  if (/qui (es[t\-]|est)|présent|c'est qui|who (is|are)/.test(q)) {
    return locale === "fr"
      ? "SINENG KENGNI Juvenal est un développeur Full-Stack et passionné de cybersécurité, étudiant à l'Université de Yaoundé 1 et détenteur de 8 certifications d'élite (IBM, Google Cloud)."
      : "SINENG KENGNI Juvenal is a Full-Stack developer and cybersecurity enthusiast, student at University of Yaoundé 1 with 8 elite certifications from IBM and Google Cloud.";
  }

  if (/contact|email|mail|linkedin|joindre/.test(q)) {
    return locale === "fr"
      ? "Vous pouvez contacter Juvenal directement à : **sinengjuvenal@gmail.com** ou via son profil [LinkedIn](https://cm.linkedin.com/in/juvenal-sineng-kengni)."
      : "You can reach Juvenal directly at: **sinengjuvenal@gmail.com** or via his [LinkedIn](https://cm.linkedin.com/in/juvenal-sineng-kengni).";
  }

  if (/projet|project|travaux|works/.test(q)) {
    const list = projects.slice(0, 4).map((p) => `• **${td(p.title)}** — ${td(p.subtitle)}`).join("\n");
    return locale === "fr"
      ? `Voici quelques-uns des projets phares de Juvenal :\n${list}\n\nConsultez la section Projets pour tous les détails !`
      : `Here are some of Juvenal's featured projects:\n${list}\n\nCheck out the Projects section for full details!`;
  }

  if (/sécurité|security|owasp|pentest|audit/.test(q)) {
    const secList = securitySkills.slice(0, 3).map((s) => `• **${td(s.title)}** : ${td(s.description)}`).join("\n");
    return locale === "fr"
      ? `Juvenal applique une politique security-first stricte :\n${secList}`
      : `Juvenal applies strict security-first principles:\n${secList}`;
  }

  if (/compétence|skill|stack|techno/.test(q)) {
    return locale === "fr"
      ? "Stack principale : **Next.js 15, TypeScript, Python, Django, Linux (Manjaro), Docker, OWASP Top 10, Google Gemini AI**."
      : "Core stack: **Next.js 15, TypeScript, Python, Django, Linux (Manjaro), Docker, OWASP Top 10, Google Gemini AI**.";
  }

  return locale === "fr"
    ? "Je peux vous renseigner sur les projets de Juvenal, ses compétences techniques, ses certifications ou ses coordonnées de contact."
    : "I can assist you with details about Juvenal's projects, technical skills, certifications, or contact information.";
}

interface AIChatBotProps {
  projects: Project[];
  skills: SkillCategory[];
  securitySkills: SecuritySkill[];
}

export default function AIChatBot({ projects, skills, securitySkills }: AIChatBotProps) {
  const { t, td, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        locale === "fr"
          ? "Bonjour ! Je suis l'assistant IA de Juvenal. Posez-moi des questions sur ses projets, ses compétences ou son parcours."
          : "Hello! I am Juvenal's AI assistant. Ask me about his projects, skills, or background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const quickPrompts = [
    locale === "fr" ? "Tes projets récents ?" : "Recent projects?",
    locale === "fr" ? "Tes compétences clés ?" : "Core skills?",
    locale === "fr" ? "Comment te contacter ?" : "How to contact?",
  ];

  const handleSend = useCallback(
    async (textToSend?: string) => {
      const msg = (textToSend || input).trim();
      if (!msg || isTyping) return;

      const userMsg: Message = { role: "user", content: msg };
      setMessages((prev) => [...prev, userMsg]);
      if (!textToSend) setInput("");
      setIsTyping(true);

      if (useGemini) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: msg,
              history: messages.slice(1).slice(-8),
            }),
          });
          const data = await res.json();
          if (res.ok && data.response) {
            setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
            setIsTyping(false);
            return;
          }
          if (data.fallback) {
            setUseGemini(false);
          }
        } catch {
          setUseGemini(false);
        }
      }

      // Offline Fallback
      const response = generateLocalResponse(
        msg,
        { projects, skills, securitySkills },
        t,
        td,
        locale
      );
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    },
    [input, isTyping, useGemini, messages, projects, skills, securitySkills, t, td, locale]
  );

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-xl border border-zinc-800 dark:border-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir l'assistant IA"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-22 right-4 sm:right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 shadow-2xl backdrop-blur-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    SKJUV AI // ASSISTANT
                  </h4>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">
                  {useGemini ? "Google Gemini Powered" : "Local Engine"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-mono">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded px-3.5 py-2.5 leading-relaxed text-xs ${
                    msg.role === "user"
                      ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                  }`}
                  dangerouslySetInnerHTML={
                    msg.role === "assistant"
                      ? { __html: renderMarkdown(msg.content) }
                      : undefined
                  }
                >
                  {msg.role === "user" ? msg.content : undefined}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-2 flex items-center gap-2 text-zinc-500 font-mono">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-[11px]">THINKING...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={locale === "fr" ? "Poser une question..." : "Ask a question..."}
              className="flex-1 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-xs font-mono placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 disabled:opacity-30 transition-colors"
              aria-label="Envoyer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
