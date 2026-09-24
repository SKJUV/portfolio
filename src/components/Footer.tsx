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
      className="pt-20 sm:pt-28 pb-12 px-4 sm:px-6 border-t border-zinc-100 dark:border-zinc-900"
    >
      <div className="max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="space-y-3 max-w-lg">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Contact
          </p>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {locale === "fr"
              ? "Démarrons une collaboration"
              : "Let's work together"}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {locale === "fr"
              ? "Disponible pour des missions de développement, audit sécurité ou architecture logicielle."
              : "Available for development, security audits, or architecture consulting."}
          </p>
        </div>

        {/* 2-Column: Info + Form */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Quick info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <a
                href={`mailto:${settings.contactEmail || "sinengjuvenal@gmail.com"}`}
                className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-4 h-4 text-zinc-400" />
                {settings.contactEmail || "sinengjuvenal@gmail.com"}
              </a>
              <p className="flex items-center gap-3 text-sm text-zinc-500">
                <span className="text-xs">📍</span>
                Yaoundé, Cameroun · Remote
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={
                  settings.githubUrl ||
                  settings.contactGithub ||
                  "https://github.com/SKJUV"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={
                  settings.linkedinUrl ||
                  settings.contactLinkedin ||
                  "https://cm.linkedin.com/in/juvenal-sineng-kengni"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {locale === "fr"
                    ? "Message envoyé avec succès !"
                    : "Message sent successfully!"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder={locale === "fr" ? "Nom" : "Name"}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder={locale === "fr" ? "Objet" : "Subject"}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-400 transition-colors"
                />

                <textarea
                  required
                  rows={4}
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Message"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  {status === "sending"
                    ? locale === "fr"
                      ? "Envoi..."
                      : "Sending..."
                    : locale === "fr"
                      ? "Envoyer"
                      : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
          <span>
            © {new Date().getFullYear()} SINENG KENGNI Juvenal
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
