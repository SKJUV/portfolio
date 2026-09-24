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

  // 1. Featured Professional Specialization (Google Cloud)
  const specialization = certifications.find((c) => c.isSpecialization);

  // 2. Remaining 8 certifications cleanly partitioned 4 vs 4
  const otherCerts = certifications.filter((c) => !c.isSpecialization);

  const securityTrack = otherCerts.filter(
    (c) =>
      c.platform.includes("IBM") ||
      c.name.toLowerCase().includes("crypt") ||
      c.name.toLowerCase().includes("security") ||
      c.name.toLowerCase().includes("linux")
  );

  const dataTrack = otherCerts.filter((c) => !securityTrack.some((st) => st.id === c.id));

  return (
    <section id="certifications" className="py-16 sm:py-20 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeader
          badge={locale === "fr" ? "ACCRÉDITATIONS" : "CREDENTIALS"}
          title={
            locale === "fr"
              ? "Badges Credly & Certifications Officielles"
              : "Credly Badges & Official Certifications"
          }
          description={
            locale === "fr"
              ? "Distinctions officielles vérifiées émises par AWS Community, IBM et Google Cloud."
              : "Verified credentials issued by AWS Community, IBM, and Google Cloud."
          }
        />

        {/* ========================================================================= */}
        {/* PART 1: CREDLY DIGITAL BADGES                                             */}
        {/* ========================================================================= */}
        {credlyBadges.length > 0 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span>{locale === "fr" ? "Badges Numériques Vérifiés" : "Verified Digital Badges"}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                    Credly
                  </span>
                </h3>
              </div>

              {credlyProfileUrl && (
                <a
                  href={credlyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors self-start sm:self-auto group"
                >
                  <span>{locale === "fr" ? "Profil Credly" : "Credly Profile"}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Credly Badges Grid (4 items) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {credlyBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5 text-center">
                    {/* Badge Image */}
                    <div className="flex justify-center pt-1">
                      <div className="relative">
                        <img
                          src={badge.imageUrl}
                          alt={badge.title}
                          className="w-20 h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Badge Title */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Credly</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                        {td(badge.title, badge.title_en)}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400">
                        {badge.issuer} · {badge.date}
                      </p>
                    </div>
                  </div>

                  {/* Verification Button */}
                  <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                    <a
                      href={badge.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{locale === "fr" ? "Vérifier" : "Verify"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART 2: FLAGSHIP SPECIALIZATION + BALANCED 4x4 TRACKS                     */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {locale === "fr" ? "Cursus Professionnels Coursera" : "Coursera Verified Tracks"}
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              {certifications.length} {locale === "fr" ? "certifications" : "credentials"}
            </span>
          </div>

          {/* 1. Flagship Google Cloud Specialization Card */}
          {specialization && (
            <div className="p-6 sm:p-7 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-zinc-900/40 to-zinc-900/30 dark:from-amber-950/30 dark:via-zinc-900/50 dark:to-zinc-950/60 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5 group">
              <div className="flex items-center gap-4 min-w-0">
                {specialization.imageUrl && (
                  <button
                    onClick={() => setSelectedCert(specialization)}
                    className="relative w-16 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 group/thumb cursor-pointer shadow-sm hover:ring-2 hover:ring-amber-500 transition-all"
                    title={locale === "fr" ? "Agrandir le certificat" : "Zoom certificate"}
                  >
                    <img
                      src={specialization.imageUrl}
                      alt={specialization.name}
                      className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </button>
                )}

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{locale === "fr" ? "Certificat Professionnel" : "Professional Certificate"}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {specialization.platform}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">{specialization.date}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {td(specialization.name, specialization.name_en)}
                  </h4>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {specialization.imageUrl && (
                  <button
                    onClick={() => setSelectedCert(specialization)}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors"
                    title={locale === "fr" ? "Aperçu du diplôme" : "Preview"}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                {specialization.verificationUrl && (
                  <a
                    href={specialization.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{locale === "fr" ? "Vérifier le diplôme" : "Verify"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 2. Symmetric 2-Column Grid (4 vs 4) */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Column 1: Cybersécurité & Systèmes (4 items) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === "fr" ? "Sécurité & Systèmes (IBM · C++ · Linux)" : "Security & Systems (IBM · C++ · Linux)"}
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">{securityTrack.length}</span>
              </div>

              <div className="space-y-2.5">
                {securityTrack.map((cert) => {
                  const certUrl = cert.verificationUrl || cert.url;
                  return (
                    <div
                      key={cert.id || cert.name}
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:border-blue-500/30 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="relative w-12 h-9 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 group/thumb cursor-pointer shadow-sm hover:ring-2 hover:ring-blue-500 transition-all"
                            title={locale === "fr" ? "Agrandir" : "Zoom"}
                          >
                            <img
                              src={cert.imageUrl}
                              alt={cert.name}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye className="w-3 h-3" />
                            </div>
                          </button>
                        )}

                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                              {cert.platform}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">{cert.date}</span>
                            {cert.grade && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {cert.grade}
                              </span>
                            )}
                          </div>
                          <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {td(cert.name, cert.name_en)}
                          </h5>
                        </div>
                      </div>

                      {/* Action */}
                      {certUrl && (
                        <a
                          href={certUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                          title={locale === "fr" ? "Vérifier" : "Verify"}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Données & Développement Web (4 items) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {locale === "fr" ? "Données & Backend (MySQL · Python)" : "Data & Backend (MySQL · Python)"}
                  </h4>
                </div>
                <span className="text-xs font-mono text-zinc-400">{dataTrack.length}</span>
              </div>

              <div className="space-y-2.5">
                {dataTrack.map((cert) => {
                  const certUrl = cert.verificationUrl || cert.url;
                  return (
                    <div
                      key={cert.id || cert.name}
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {cert.imageUrl && (
                          <button
                            onClick={() => setSelectedCert(cert)}
                            className="relative w-12 h-9 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 group/thumb cursor-pointer shadow-sm hover:ring-2 hover:ring-emerald-500 transition-all"
                            title={locale === "fr" ? "Agrandir" : "Zoom"}
                          >
                            <img
                              src={cert.imageUrl}
                              alt={cert.name}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye className="w-3 h-3" />
                            </div>
                          </button>
                        )}

                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                              {cert.platform}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">{cert.date}</span>
                            {cert.grade && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {cert.grade}
                              </span>
                            )}
                          </div>
                          <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {td(cert.name, cert.name_en)}
                          </h5>
                        </div>
                      </div>

                      {/* Action */}
                      {certUrl && (
                        <a
                          href={certUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
                          title={locale === "fr" ? "Vérifier" : "Verify"}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
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
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {selectedCert.platform} · {selectedCert.date}
                    </span>
                    {selectedCert.grade && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {locale === "fr" ? "Score" : "Score"}: {selectedCert.grade}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {td(selectedCert.name, selectedCert.name_en)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
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
