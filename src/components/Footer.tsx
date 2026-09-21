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
  MapPin, 
  Clock, 
  ShieldCheck,
  ArrowUp
} from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import type { Settings } from "@/lib/content";

interface FooterProps {
  settings: Settings;
}

export default function Footer({ settings }: FooterProps) {
  const { locale } = useLanguage();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
        setErrorMsg(data.error || (locale === "fr" ? "Erreur lors de l'envoi" : "Failed to send"));
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg(
        locale === "fr"
          ? "Erreur de connexion au serveur. Réessayez."
          : "Server connection error. Please retry."
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-20 sm:pt-28 pb-12 px-4 sm:px-6 relative border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeader
          badge="CONTACT"
          title={
            locale === "fr"
              ? "Démarrons une Collaboration"
              : "Let's Build Something Great"
          }
          description={
            locale === "fr"
              ? "Disponible pour des missions de développement full-stack, d'audit de sécurité ou de conception d'architectures résilientes."
              : "Available for full-stack engineering, application security reviews, or high-resilience architecture design."
          }
        />

        {/* 2-Column Contact Section */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {locale === "fr" ? "Discutons de votre projet" : "Get In Touch"}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {locale === "fr"
                  ? "Que vous ayez besoin d'une application web complète, d'une revue de sécurité ou d'un renfort d'équipe, je réponds généralement sous 24 heures."
                  : "Whether you need a complete web application, a security review, or senior engineering muscle, I typically respond within 24 hours."}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${settings.contactEmail || "sinengjuvenal@gmail.com"}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 font-mono block">Email</span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {settings.contactEmail || "sinengjuvenal@gmail.com"}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 font-mono block">
                    {locale === "fr" ? "Localisation" : "Location"}
                  </span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Yaoundé, Cameroun · Remote Worldwide
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 font-mono block">
                    {locale === "fr" ? "Disponibilité" : "Response Time"}
                  </span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {locale === "fr" ? "Réponse sous 24 heures" : "Under 24h response"}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings.githubUrl || settings.contactGithub || "https://github.com/SKJUV"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={settings.linkedinUrl || settings.contactLinkedin || "https://cm.linkedin.com/in/juvenal-sineng-kengni"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Linear-Style Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 shadow-xl relative overflow-hidden">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center justify-between">
                <span>{locale === "fr" ? "Envoyer un message direct" : "Send a Direct Message"}</span>
                <Badge variant="blue" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Rate-limited & Secure
                </Badge>
              </h4>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400 mx-auto" />
                  <h5 className="text-base font-semibold text-emerald-600 dark:text-emerald-300">
                    {locale === "fr" ? "Message transmis avec succès !" : "Message sent successfully!"}
                  </h5>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                    {locale === "fr"
                      ? "Merci pour votre message. Je vous répondrai dans les plus brefs délais."
                      : "Thank you for reaching out. I will get back to you shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block">
                        {locale === "fr" ? "Votre Nom" : "Your Name"}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={locale === "fr" ? "ex: Marc Dupont" : "e.g. John Doe"}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block">
                        {locale === "fr" ? "Votre Email" : "Your Email"}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={locale === "fr" ? "nom@entreprise.com" : "name@company.com"}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block">
                      {locale === "fr" ? "Objet du message" : "Subject"}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder={locale === "fr" ? "Opportunité de mission / Question" : "Project collaboration / Inquiry"}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={5000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={
                        locale === "fr"
                          ? "Décrivez brièvement votre projet ou votre demande..."
                          : "Briefly describe your project or inquiry..."
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === "sending"}
                    className="w-full justify-center"
                    icon={
                      status === "sending" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )
                    }
                    iconPosition="right"
                  >
                    {status === "sending"
                      ? locale === "fr"
                        ? "Envoi en cours..."
                        : "Sending..."
                      : locale === "fr"
                      ? "Envoyer le message"
                      : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SINENG KENGNI Juvenal.</span>
            <span>·</span>
            <span>Next.js 15 & TypeScript</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>{locale === "fr" ? "Retour en haut" : "Back to top"}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
