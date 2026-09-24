"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle2, Eye, X } from "lucide-react";
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

  const specialization = certifications.find((c) => c.isSpecialization);
  const otherCerts = certifications.filter((c) => !c.isSpecialization);

  return (
    <section
      id="certifications"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-zinc-50/50 dark:bg-zinc-900/30"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {locale === "fr" ? "Accréditations" : "Credentials"}
          </p>
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            {locale === "fr"
              ? "Badges & Certifications"
              : "Badges & Certifications"}
          </h2>
        </div>

        {/* Credly Badges */}
        {credlyBadges.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                Credly
              </h3>
              {credlyProfileUrl && (
                <a
                  href={credlyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  {locale === "fr" ? "Profil" : "Profile"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {credlyBadges.map((badge) => (
                <a
                  key={badge.id}
                  href={badge.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-center space-y-3 group"
                >
                  <img
                    src={badge.imageUrl}
                    alt={badge.title}
                    className="w-14 h-14 mx-auto object-contain group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-snug line-clamp-2">
                      {td(badge.title, badge.title_en)}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-mono mt-1">
                      {badge.issuer}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Professional Specialization */}
        {specialization && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
            <div className="flex items-center gap-4 min-w-0">
              {specialization.imageUrl && (
                <button
                  onClick={() => setSelectedCert(specialization)}
                  className="w-14 h-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
                >
                  <img
                    src={specialization.imageUrl}
                    alt={specialization.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium">
                    {locale === "fr"
                      ? "Certificat Professionnel"
                      : "Professional Certificate"}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {specialization.platform}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mt-1 truncate">
                  {td(specialization.name, specialization.name_en)}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {specialization.imageUrl && (
                <button
                  onClick={() => setSelectedCert(specialization)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              )}
              {specialization.verificationUrl && (
                <a
                  href={specialization.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-blue-500 transition-colors flex items-center gap-1"
                >
                  {locale === "fr" ? "Vérifier" : "Verify"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Other Certifications — clean list */}
        {otherCerts.length > 0 && (
          <div className="space-y-2">
            {otherCerts.map((cert) => {
              const certUrl = cert.verificationUrl || cert.url;
              return (
                <div
                  key={cert.id || cert.name}
                  className="py-3 px-4 rounded-lg border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/30 flex items-center justify-between gap-3 hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {cert.imageUrl && (
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="w-10 h-7 rounded overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0 hover:ring-1 hover:ring-blue-400 transition-all cursor-pointer"
                      >
                        <img
                          src={cert.imageUrl}
                          alt={cert.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    )}
                    <div className="min-w-0">
                      <h5 className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 truncate">
                        {td(cert.name, cert.name_en)}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {cert.platform}
                        </span>
                        {cert.grade && (
                          <span className="text-[10px] font-mono text-blue-500">
                            {cert.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {cert.imageUrl && (
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                    )}
                    {certUrl && (
                      <a
                        href={certUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-zinc-400 hover:text-blue-500 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-xl w-full p-5 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {selectedCert.platform} · {selectedCert.date}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mt-1">
                    {td(selectedCert.name, selectedCert.name_en)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.name}
                  className="w-full h-auto object-contain max-h-[55vh]"
                />
              </div>

              {selectedCert.verificationUrl && (
                <div className="flex justify-end">
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    {locale === "fr"
                      ? "Vérifier sur Coursera"
                      : "Verify on Coursera"}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
