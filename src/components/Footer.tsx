"use client";

import { useState } from "react";
import {
  Github,
  Mail,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUp,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import type { Settings } from "@/lib/content";

interface FooterProps {
  settings: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const { locale } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const contactEmail = settings.contactEmail || "sinengjuvenal@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data.error ||
            (locale === "fr" ? "Erreur lors de l'envoi" : "Failed to send")
        );
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg(
        locale === "fr"
          ? "Erreur de connexion. Réessayez."
          : "Connection error. Please retry."
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="pt-20 sm:pt-28 pb-12 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-950"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Marker */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            05 // DIRECT CONTACT & COLLABORATION
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* 2-Column Swiss Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Direct Info & Email Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
                {locale === "fr"
                  ? "Concevons des systèmes résilients."
                  : "Let's build resilient systems."}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {locale === "fr"
                  ? "Disponible pour des opportunités professionnelles, missions d'ingénierie full-stack, audits de sécurité et architecture logicielle."
                  : "Available for engineering roles, security audits, architecture consulting, and software collaborations."}
              </p>
            </div>

            {/* Direct 1-Click Email Card */}
            <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md space-y-2">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                DIRECT_DISPATCH
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate">
                  {contactEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-zinc-50 dark:bg-zinc-800 text-[11px] font-mono flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 transition-colors"
                  title="Copier l'adresse email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Links */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                <span>LOCATION:</span>
                <span className="text-zinc-800 dark:text-zinc-200">YAOUNDÉ, CM (UTC+1) · REMOTE</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <a
                  href={settings.contactGithub || "https://github.com/SKJUV"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB ↗</span>
                </a>
                <a
                  href={settings.contactLinkedin || "https://cm.linkedin.com/in/juvenal-sineng-kengni"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN ↗</span>
                </a>
                {settings.credlyUrl && (
                  <a
                    href={settings.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>CREDLY ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Minimalist Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3">
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  // DISPATCH_FORM
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  ENCRYPTED TRANSMISSION
                </span>
              </div>

              {status === "success" ? (
                <div className="p-8 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-zinc-900 dark:text-white mx-auto" />
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    {locale === "fr"
                      ? "TRANSMISSION_EFFECTUÉE // Réponse sous 24h"
                      : "TRANSMISSION_SENT // Response within 24h"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3 rounded border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono uppercase text-zinc-500">
                        {locale === "fr" ? "Identité / Nom" : "Name / Identity"}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder={locale === "fr" ? "ex: Alex V." : "e.g. Alex V."}
                        className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-mono uppercase text-zinc-500">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="contact@domain.com"
                        className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase text-zinc-500">
                      {locale === "fr" ? "Sujet / Contexte" : "Subject"}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      placeholder={locale === "fr" ? "Proposition de mission, collaboration..." : "Project proposal, role..."}
                      className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase text-zinc-500">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={5000}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder={locale === "fr" ? "Détails de la demande..." : "Details about the project..."}
                      className="w-full px-3 py-2 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-none focus:border-zinc-500 dark:focus:border-zinc-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-2.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {status === "sending"
                        ? locale === "fr"
                          ? "TRANSMISSION..."
                          : "DISPATCHING..."
                        : locale === "fr"
                        ? "ENVOYER LE MESSAGE"
                        : "TRANSMIT DISPATCH"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <span>
            © {new Date().getFullYear()} SINENG KENGNI JUVENAL · YAOUNDÉ, CM
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span>BACK_TO_TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
