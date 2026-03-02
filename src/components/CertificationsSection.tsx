"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Award, ExternalLink, X, Calendar, Building2, ChevronLeft, ChevronRight, Shield, Cloud, Code2, Wrench, Layers } from "lucide-react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/providers/LanguageProvider";
import type { PortfolioData, Certification } from "@/lib/admin-types";

const CERTS_PER_PAGE = 6;

/* ─── Catégories ─── */
type CertCategoryKey = "all" | "security" | "cloud" | "code" | "dev" | "other";

const CATEGORY_CONFIG: { key: CertCategoryKey; icon: typeof Shield; i18nKey: string }[] = [
  { key: "all", icon: Layers, i18nKey: "cert.filter.all" },
  { key: "security", icon: Shield, i18nKey: "cert.filter.security" },
  { key: "cloud", icon: Cloud, i18nKey: "cert.filter.cloud" },
  { key: "code", icon: Code2, i18nKey: "cert.filter.code" },
  { key: "dev", icon: Wrench, i18nKey: "cert.filter.dev" },
  { key: "other", icon: Layers, i18nKey: "cert.filter.other" },
];

function getCertCategoryKey(cert: Certification): CertCategoryKey {
  const id = cert.id.toLowerCase();
  const name = cert.name.toLowerCase();

  if (
    name.includes("penetration") ||
    name.includes("threat hunting") ||
    name.includes("cryptography") ||
    name.includes("encryption") ||
    name.includes("decryption") ||
    (name.includes("security") && !name.includes("cloud"))
  )
    return "security";

  if (
    (name.includes("cloud") && (name.includes("security") || name.includes("risk") || name.includes("threat"))) ||
    id.includes("cloud-security")
  )
    return "cloud";

  if (
    name.includes("python") ||
    name.includes("javascript") ||
    name.includes("json") ||
    name.includes("c++") ||
    id.includes("python") ||
    id.includes("javascript")
  )
    return "code";

  if (
    name.includes("mysql") ||
    name.includes("database") ||
    name.includes("php") ||
    name.includes("agile") ||
    id.includes("mysql") ||
    id.includes("agile")
  )
    return "dev";

  return "other";
}

/** Ordre de tri des catégories */
const CATEGORY_ORDER: Record<CertCategoryKey, number> = {
  all: 0, security: 1, cloud: 2, code: 3, dev: 4, other: 5,
};

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const { t, td } = useLanguage();

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
            <Image
              src={cert.imageUrl}
              alt={cert.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 90vw, 500px"
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
              {td(cert.description, cert.description_en)}
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
  const { t, td } = useLanguage();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>(0.05);
  const mobileRef = useScrollReveal<HTMLDivElement>(0.05);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CertCategoryKey>("all");
  const [animClass, setAnimClass] = useState("opacity-100 translate-x-0 scale-100");
  const isAnimatingRef = useRef(false);

  const handleClose = useCallback(() => setSelectedCert(null), []);

  // Tri par catégorie : Sécurité → Cloud → Code → Dev → Autres
  const sortedCerts = useMemo(
    () =>
      [...(certifications || [])].sort(
        (a, b) => CATEGORY_ORDER[getCertCategoryKey(a)] - CATEGORY_ORDER[getCertCategoryKey(b)]
      ),
    [certifications]
  );

  // Filtrage par catégorie active
  const filteredCerts = useMemo(
    () =>
      activeFilter === "all"
        ? sortedCerts
        : sortedCerts.filter((c) => getCertCategoryKey(c) === activeFilter),
    [sortedCerts, activeFilter]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredCerts.length / CERTS_PER_PAGE),
    [filteredCerts]
  );

  const paginatedCerts = useMemo(
    () =>
      filteredCerts.slice(
        currentPage * CERTS_PER_PAGE,
        (currentPage + 1) * CERTS_PER_PAGE
      ),
    [filteredCerts, currentPage]
  );

  // Compteur par catégorie pour les badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CertCategoryKey, number> = { all: 0, security: 0, cloud: 0, code: 0, dev: 0, other: 0 };
    sortedCerts.forEach((c) => {
      counts[getCertCategoryKey(c)]++;
      counts.all++;
    });
    return counts;
  }, [sortedCerts]);

  // Catégories disponibles (au moins 1 cert)
  const availableCategories = useMemo(
    () => CATEGORY_CONFIG.filter((c) => categoryCounts[c.key] > 0),
    [categoryCounts]
  );

  const animateTransition = useCallback(
    (direction: "left" | "right", callback: () => void) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      // Exit
      setAnimClass(
        direction === "right"
          ? "opacity-0 -translate-x-6 scale-[0.98]"
          : "opacity-0 translate-x-6 scale-[0.98]"
      );
      setTimeout(() => {
        callback();
        // Enter from opposite side
        setAnimClass(
          direction === "right"
            ? "opacity-0 translate-x-6 scale-[0.98]"
            : "opacity-0 -translate-x-6 scale-[0.98]"
        );
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimClass("opacity-100 translate-x-0 scale-100");
            setTimeout(() => { isAnimatingRef.current = false; }, 300);
          });
        });
      }, 250);
    },
    []
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages || page === currentPage) return;
      animateTransition(page > currentPage ? "right" : "left", () => setCurrentPage(page));
    },
    [totalPages, currentPage, animateTransition]
  );

  const handleFilterChange = useCallback(
    (key: CertCategoryKey) => {
      if (key === activeFilter) return;
      animateTransition("right", () => {
        setActiveFilter(key);
        setCurrentPage(0);
      });
    },
    [activeFilter, animateTransition]
  );

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <>
      <section id="certifications" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          <div ref={headerRef} className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">
              🏅 {t("section.certifications")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("section.certifications.desc")}
            </p>
          </div>

          {/* ─── Filtres par catégorie ─── */}
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filtrer les certifications">
            {availableCategories.map(({ key, icon: Icon, i18nKey }) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeFilter === key}
                onClick={() => handleFilterChange(key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  activeFilter === key
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                    : "glass-card hover:bg-primary/10 text-muted-foreground hover:text-foreground hover:scale-[1.02]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t(i18nKey)}
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeFilter === key
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {categoryCounts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* ─── Mobile: horizontal scroll ─── */}
          <div className="scroll-fade-container sm:hidden">
            <div ref={mobileRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 stagger-children">
              {filteredCerts.map((cert) => (
                <CertCard key={cert.id} cert={cert} onSelect={setSelectedCert} />
              ))}
            </div>
          </div>

          {/* ─── Desktop: paginated grid ─── */}
          <div className="hidden sm:block">
            <div className="relative overflow-hidden" aria-live="polite" aria-atomic="true">
              <div
                ref={gridRef}
                className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-out ${animClass}`}
                style={{ willChange: "transform, opacity" }}
              >
                {paginatedCerts.map((cert, i) => (
                  <div
                    key={cert.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                  >
                    <CertCard cert={cert} onSelect={setSelectedCert} />
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Pagination ─── */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-3 mt-10" aria-label="Pagination des certifications">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="p-2.5 rounded-xl glass-card hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Page précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2" role="list">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      aria-label={`Page ${i + 1}`}
                      aria-current={i === currentPage ? "page" : undefined}
                      className={`h-9 min-w-[2.25rem] px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        i === currentPage
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                          : "glass-card hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="p-2.5 rounded-xl glass-card hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Page suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}

            {/* Page counter */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-muted-foreground mt-3" aria-live="polite">
                Page {currentPage + 1} {t("cert.pageOf") || "sur"} {totalPages} — {filteredCerts.length} {t("section.certifications").toLowerCase()}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCert && <CertModal cert={selectedCert} onClose={handleClose} />}
    </>
  );
}

/* ─── Composant carte réutilisable ─── */
function CertCard({
  cert,
  onSelect,
}: {
  cert: Certification;
  onSelect: (c: Certification) => void;
}) {
  const { t, td } = useLanguage();
  return (
    <button
      onClick={() => onSelect(cert)}
      className="w-[80vw] max-w-[300px] flex-none snap-start sm:w-auto sm:max-w-none sm:flex-auto text-left glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all group cursor-pointer"
    >
      {cert.imageUrl ? (
        <div className="relative w-full aspect-[16/10] bg-muted/20 overflow-hidden">
          <Image
            src={cert.imageUrl}
            alt={cert.name}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <Award className="h-16 w-16 text-primary/40" />
        </div>
      )}

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
            {cert.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{cert.platform}</p>
        </div>

        {cert.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {td(cert.description, cert.description_en)}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-mono">{cert.date}</span>
          <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {t("cert.details")} →
          </span>
        </div>
      </div>
    </button>
  );
}
