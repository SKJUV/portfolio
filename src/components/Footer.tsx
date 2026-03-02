"use client";

import { useState } from "react";
import { Github, Mail, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData } from "@/lib/admin-types";

export default function Footer({ data }: { data: PortfolioData }) {
  const { settings } = data;
  const { t, td } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>(0.1);
  const infoRef = useScrollReveal<HTMLDivElement>(0.1);

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
        setErrorMsg(data.error || t("contact.errorSend"));
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMsg(t("contact.errorConnection"));
    }
  };

  return (
    <footer id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Titre */}
        <div ref={headerRef} className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">📬 {t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Formulaire de contact */}
          <div ref={formRef} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-semibold">{t("contact.send")}</h3>

            {status === "success" ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 text-primary">
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{t("contact.sent")}</p>
                  <p className="text-xs opacity-80 mt-0.5">{t("contact.sentDesc")}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t("contact.yourName")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t("contact.yourEmail")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t("contact.subjectPlaceholder")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    {t("contact.message")}
                  </label>
                  <textarea
                    required
                    maxLength={5000}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-destructive text-xs">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all glow-primary disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {status === "sending" ? t("contact.sending") : t("contact.submit")}
                </button>
              </form>
            )}
          </div>

          {/* Infos de contact */}
          <div ref={infoRef} className="space-y-8">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-semibold">{t("contact.info")}</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("contact.emailLabel")}</p>
                    <p className="text-xs text-muted-foreground">{settings.contactEmail}</p>
                  </div>
                </a>

                <a
                  href={settings.contactGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("contact.githubLabel")}</p>
                    <p className="text-xs text-muted-foreground">{settings.contactGithub.replace("https://", "")}</p>
                  </div>
                </a>

                <a
                  href={settings.contactLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("contact.linkedinLabel")}</p>
                    <p className="text-xs text-muted-foreground">{settings.contactLinkedin.replace("https://www.", "")}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-center space-y-1 text-sm text-muted-foreground">
              <p>{td(settings.footerText, settings.footerText_en)}</p>
              <p className="font-mono text-xs opacity-60">github.com/SKJUV</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
