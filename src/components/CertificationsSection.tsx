"use client";

import { useState, useEffect, useCallback } from "react";
import { Award, ExternalLink, X, Calendar, Building2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData, Certification } from "@/lib/admin-types";

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const { t } = useLanguage();

  // Fermer avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-0 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        {cert.imageUrl && (
          <div className="relative w-full aspect-video bg-muted/30 rounded-t-2xl overflow-hidden">
            <img
              src={cert.imageUrl}
              alt={cert.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-xl glass hover:bg-destructive/10 transition-colors z-10"
          aria-label={t("cert.close")}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold leading-tight">{cert.name}</h3>
          </div>

          {cert.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {cert.description}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">{t("cert.platform")} :</span>
              <span className="font-medium">{cert.platform}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <span className="text-muted-foreground">{t("cert.date")} :</span>
              <span className="font-mono font-medium">{cert.date}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-border/50">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("cert.verify")}
              </a>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsSection({ data }: { data: PortfolioData }) {
  const { certifications } = data;
  const { t } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.05);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleClose = useCallback(() => setSelectedCert(null), []);

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <>
      <section id="certifications" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div ref={headerRef} className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">
              🏅 {t("section.certifications")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("section.certifications.desc")}
            </p>
          </div>

          <div className="scroll-fade-container">
            <div ref={gridRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:snap-none stagger-children">
            {certifications.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto text-left glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all group cursor-pointer"
              >
                {/* Image au-dessus — pleine largeur */}
                {cert.imageUrl ? (
                  <div className="w-full aspect-[16/10] bg-muted/20 overflow-hidden">
                    <img
                      src={cert.imageUrl}
                      alt={cert.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Award className="h-16 w-16 text-primary/40" />
                  </div>
                )}

                {/* Contenu sous l'image */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.platform}
                    </p>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-mono">
                      {cert.date}
                    </span>
                    <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("cert.details")} →
                    </span>
                  </div>
                </div>
              </button>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCert && <CertModal cert={selectedCert} onClose={handleClose} />}
    </>
  );
}
