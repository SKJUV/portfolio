"use client";

import { useState } from "react";
import { Award, ExternalLink, ShieldCheck, Database, CheckCircle2, Sparkles, Eye, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import type { Certification, CredlyBadge } from "@/lib/content";

interface CertificationsSectionProps {
  certifications: Certification[];
  credlyBadges?: CredlyBadge[];
  credlyProfileUrl?: string;
}

export default function CertificationsSection({
  certifications,
  credlyBadges = [],
  credlyProfileUrl = "https://www.credly.com/users/juvenal-sineng",
}: CertificationsSectionProps) {
  const { locale, td } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Header */}
        <SectionHeader
          badge={locale === "fr" ? "ACCRÉDITATIONS OFFICIELLES" : "OFFICIAL CREDENTIALS"}
          title={
            locale === "fr"
              ? "Badges Credly & Certifications d'Élite"
              : "Credly Badges & Elite Certifications"
          }
          description={
            locale === "fr"
              ? "Distinctions officielles vérifiées émises par AWS Community, IBM et Google Cloud, attestant de compétences solides en sécurité, cloud et IA."
              : "Verified credentials issued by AWS Community, IBM, and Google Cloud, demonstrating expertise in security, cloud infrastructure, and AI."
          }
        />

        {/* ========================================================================= */}
        {/* PART 1: CREDLY DIGITAL BADGES SHOWCASE                                   */}
        {/* ========================================================================= */}
        {credlyBadges.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>{locale === "fr" ? "Badges Numériques Vérifiés" : "Verified Digital Badges"}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      Credly
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {locale === "fr"
                      ? "Accréditations émises par AWS Community et IBM via Pearson Credly"
                      : "Official credentials issued by AWS Community & IBM via Pearson Credly"}
                  </p>
                </div>
              </div>

              {credlyProfileUrl && (
                <a
                  href={credlyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-sm transition-all duration-150 self-start sm:self-auto group"
                >
                  <span>{locale === "fr" ? "Voir mon profil Credly" : "View Credly Profile"}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Credly Badges Grid (4 items) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {credlyBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Badge Image Centered with Glow on Hover */}
                    <div className="flex justify-center pt-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/25 transition-all duration-300" />
                        <img
                          src={badge.imageUrl}
                          alt={badge.title}
                          className="w-24 h-24 object-contain relative z-10 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Badge Meta */}
                    <div className="space-y-1.5 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{locale === "fr" ? "Vérifié sur Credly" : "Credly Verified"}</span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                        {td(badge.title, badge.title_en)}
                      </h4>

                      <p className="text-[11px] font-mono text-zinc-500">
                        {badge.issuer} · {badge.date}
                      </p>
                    </div>

                    {/* Skill Tags */}
                    {badge.skills && badge.skills.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 pt-1">
                        {badge.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Verification Link Button */}
                  <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <a
                      href={badge.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-blue-600 hover:text-white text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>{locale === "fr" ? "Vérifier le badge" : "Verify Badge"}</span>
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART 2: INDUSTRY CERTIFICATIONS TRACKS (COURSERA, IBM, GOOGLE CLOUD)     */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="pb-1 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {locale === "fr" ? "Cursus Professionnels Validés" : "Certified Industry Tracks"}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {locale === "fr"
                ? "Programmes de spécialisation approfondis avec diplômes officiels vérifiables"
                : "Deep specialization programs with verifiable official credentials"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Column 1: Cybersécurité & Cloud (IBM & Google) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === "fr" ? "Cybersécurité & Cloud (IBM · Google)" : "Cybersecurity & Cloud (IBM · Google)"}
                  </h4>
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
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Certificate Thumbnail Preview Button */}
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="relative w-14 h-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 group/thumb cursor-pointer shadow-sm hover:ring-2 hover:ring-blue-500 transition-all"
                            title={locale === "fr" ? "Agrandir le certificat" : "Zoom certificate"}
                          >
                            <img
                              src={cert.imageUrl}
                              alt={cert.name}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        )}

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

                          <h5 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug truncate">
                            {td(cert.name, cert.name_en)}
                          </h5>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title={locale === "fr" ? "Aperçu du diplôme" : "Preview"}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {certUrl && (
                          <a
                            href={certUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-blue-600 hover:text-white text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors"
                            title={locale === "fr" ? "Vérifier le diplôme" : "Verify"}
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{locale === "fr" ? "Vérifier" : "Verify"}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
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
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === "fr" ? "Ingénierie Données & Modélisation" : "Data Engineering & Modeling"}
                  </h4>
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
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Certificate Thumbnail Preview Button */}
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="relative w-14 h-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 group/thumb cursor-pointer shadow-sm hover:ring-2 hover:ring-emerald-500 transition-all"
                            title={locale === "fr" ? "Agrandir le certificat" : "Zoom certificate"}
                          >
                            <img
                              src={cert.imageUrl}
                              alt={cert.name}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        )}

                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                              {cert.platform}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-mono">{cert.date}</span>
                          </div>

                          <h5 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug truncate">
                            {td(cert.name, cert.name_en)}
                          </h5>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            title={locale === "fr" ? "Aperçu du diplôme" : "Preview"}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {certUrl && (
                          <a
                            href={certUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-emerald-600 hover:text-white text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors"
                            title={locale === "fr" ? "Vérifier le diplôme" : "Verify"}
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{locale === "fr" ? "Vérifier" : "Verify"}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CERTIFICATE LIGHTBOX MODAL                                               */}
        {/* ========================================================================= */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {selectedCert.platform} · {selectedCert.date}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {td(selectedCert.name, selectedCert.name_en)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.name}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-xs text-zinc-500">
                  {locale === "fr" ? "Certificat officiel et vérifié" : "Official verified credential"}
                </span>
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>{locale === "fr" ? "Vérifier sur Coursera" : "Verify on Coursera"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
