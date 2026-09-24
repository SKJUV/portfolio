"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2, Eye, X, ShieldCheck, Award } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
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
  const [filter, setFilter] = useState<"all" | "credly" | "coursera">("all");

  const specialization = certifications.find((c) => c.isSpecialization);
  const otherCerts = certifications.filter((c) => !c.isSpecialization);

  return (
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              04 // ACCREDITATIONS & CREDENTIALS
            </span>
            <div className="h-px w-16 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded transition-colors ${
                filter === "all"
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              ALL ({credlyBadges.length + certifications.length})
            </button>
            <button
              onClick={() => setFilter("credly")}
              className={`px-3 py-1 rounded transition-colors ${
                filter === "credly"
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              CREDLY ({credlyBadges.length})
            </button>
            <button
              onClick={() => setFilter("coursera")}
              className={`px-3 py-1 rounded transition-colors ${
                filter === "coursera"
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              COURSERA ({certifications.length})
            </button>
          </div>
        </div>

        {/* Flagship: Professional Specialization */}
        {specialization && (filter === "all" || filter === "coursera") && (
          <div className="p-6 sm:p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  //FLAGSHIP_CREDENTIAL
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold">
                  PROFESSIONAL CERTIFICATE
                </span>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                GOOGLE CLOUD · 2026
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {td(specialization.name, specialization.name_en)}
                </h3>
                {specialization.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {td(specialization.description, specialization.description_en)}
                  </p>
                )}
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
                {specialization.imageUrl && (
                  <button
                    onClick={() => setSelectedCert(specialization)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono text-zinc-700 dark:text-zinc-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{locale === "fr" ? "Aperçu Diplôme" : "Preview Certificate"}</span>
                  </button>
                )}
                {specialization.verificationUrl && (
                  <a
                    href={specialization.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-mono hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    <span>{locale === "fr" ? "Vérification Officielle" : "Official Verification"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Credly Digital Badges Grid */}
        {credlyBadges.length > 0 && (filter === "all" || filter === "credly") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  // CREDLY_VERIFIED_BADGES
                </span>
              </div>
              {credlyProfileUrl && (
                <a
                  href={credlyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>CREDLY_PROFILE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {credlyBadges.map((badge) => (
                <a
                  key={badge.id}
                  href={badge.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto flex items-center justify-center p-1 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-100 dark:border-zinc-800">
                      <img
                        src={badge.imageUrl}
                        alt={badge.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                        {td(badge.title, badge.title_en)}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400">
                        {badge.issuer} · {badge.date}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>VERIFIED</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Coursera Course Certificates Directory Table */}
        {otherCerts.length > 0 && (filter === "all" || filter === "coursera") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                // COURSE_ARCHIVE & VERIFICATIONS
              </span>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-md">
              {otherCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {td(cert.name, cert.name_en)}
                      </h4>
                      {cert.grade && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                          {cert.grade}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-zinc-500">
                      {cert.platform} · {cert.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cert.imageUrl && (
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="p-1.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title={locale === "fr" ? "Aperçu" : "Preview"}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificate Modal Lightbox */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    {td(selectedCert.name, selectedCert.name_en)}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {selectedCert.platform} · {selectedCert.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center max-h-[70vh] overflow-auto">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.name}
                  className="max-h-[60vh] object-contain rounded border border-zinc-200 dark:border-zinc-800"
                />
              </div>

              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  {selectedCert.grade ? `Score: ${selectedCert.grade}` : "Officially Verified"}
                </span>
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-mono hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    <span>Vérifier en ligne</span>
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
