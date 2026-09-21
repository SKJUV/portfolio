"use client";

import { Award, ExternalLink, ShieldCheck, Cloud, Database, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import type { Certification } from "@/lib/content";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const { locale, td } = useLanguage();

  const securityAndCloud = certifications.filter(
    (c) =>
      c.platform.includes("IBM") ||
      c.platform.includes("Google") ||
      c.name.toLowerCase().includes("crypt") ||
      c.name.toLowerCase().includes("security")
  );

  const softwareAndData = certifications.filter(
    (c) => !securityAndCloud.some((sc) => sc.id === c.id)
  );

  return (
    <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionHeader
          badge={locale === "fr" ? "ACCRÉDITATIONS OFFICIELLES" : "OFFICIAL CREDENTIALS"}
          title={
            locale === "fr"
              ? "Certifications d'Élite Vérifiées"
              : "Verified Industry Certifications"
          }
          description={
            locale === "fr"
              ? "Cursus spécialisés validés par IBM et Google Cloud, centrés sur les audits de sécurité, le cloud durci et l'ingénierie logicielle."
              : "Specialized tracks certified by IBM and Google Cloud, focused on security audits, cloud hardening, and software engineering."
          }
        />

        {/* Credentials Split Columns */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Column 1: Cybersécurité & Cloud (IBM & Google) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === "fr" ? "Cybersécurité & Cloud (IBM · Google)" : "Cybersecurity & Cloud (IBM · Google)"}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">4 vérifiées</span>
            </div>

            <div className="space-y-3">
              {securityAndCloud.map((cert) => {
                const certUrl = cert.verificationUrl || cert.url;
                const isIBM = cert.platform.includes("IBM");
                const isGoogle = cert.platform.includes("Google");

                return (
                  <div
                    key={cert.id || cert.name}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm hover:border-blue-500/40 transition-all duration-150 flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                            isIBM
                              ? "bg-blue-600/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                              : isGoogle
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {cert.platform}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">{cert.date}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug truncate">
                        {td(cert.name, cert.name_en)}
                      </h4>
                    </div>

                    {certUrl && (
                      <a
                        href={certUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-blue-600 hover:text-white text-zinc-600 dark:text-zinc-300 text-xs font-medium shrink-0 transition-colors"
                        title={locale === "fr" ? "Vérifier le diplôme" : "Verify"}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{locale === "fr" ? "Vérifier" : "Verify"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Ingénierie des Données & Systèmes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {locale === "fr" ? "Ingénierie Données & Modélisation" : "Data Engineering & Modeling"}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">4 vérifiées</span>
            </div>

            <div className="space-y-3">
              {softwareAndData.map((cert) => {
                const certUrl = cert.verificationUrl || cert.url;

                return (
                  <div
                    key={cert.id || cert.name}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm hover:border-emerald-500/40 transition-all duration-150 flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {cert.platform}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">{cert.date}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug truncate">
                        {td(cert.name, cert.name_en)}
                      </h4>
                    </div>

                    {certUrl && (
                      <a
                        href={certUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-emerald-600 hover:text-white text-zinc-600 dark:text-zinc-300 text-xs font-medium shrink-0 transition-colors"
                        title={locale === "fr" ? "Vérifier le diplôme" : "Verify"}
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{locale === "fr" ? "Vérifier" : "Verify"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
