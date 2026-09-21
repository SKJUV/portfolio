"use client";

import { useState } from "react";
import { Award, ExternalLink, ShieldCheck, Cloud, Code2, Layers } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { SectionHeader } from "./ui/SectionHeader";
import type { Certification } from "@/lib/content";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const { locale, td } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "security" | "cloud" | "code">("all");

  const filterCert = (cert: Certification) => {
    if (selectedFilter === "all") return true;
    const name = cert.name.toLowerCase();
    const desc = (cert.description || "").toLowerCase();

    if (selectedFilter === "security") {
      return (
        name.includes("security") ||
        name.includes("encryption") ||
        name.includes("threat") ||
        name.includes("pentest") ||
        name.includes("crypt") ||
        desc.includes("sécurité")
      );
    }
    if (selectedFilter === "cloud") {
      return (
        name.includes("cloud") ||
        name.includes("google") ||
        desc.includes("cloud")
      );
    }
    if (selectedFilter === "code") {
      return (
        name.includes("python") ||
        name.includes("javascript") ||
        name.includes("json") ||
        name.includes("c++") ||
        name.includes("mysql") ||
        name.includes("data")
      );
    }
    return true;
  };

  const filtered = certifications.filter(filterCert);

  return (
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6 relative bg-zinc-100/50 dark:bg-zinc-950/40">
      <div className="max-w-6xl mx-auto space-y-12">
        <SectionHeader
          badge={locale === "fr" ? "ACCRÉDITATIONS" : "CERTIFICATIONS"}
          title={
            locale === "fr"
              ? "17 Certifications Professionnelles"
              : "17 Professional Certifications"
          }
          description={
            locale === "fr"
              ? "Un parcours rigoureux validé par Coursera, IBM et Google Cloud, couvrant la cybersécurité, le cloud et l'ingénierie logicielle."
              : "A rigorous track certified by Coursera, IBM, and Google Cloud, spanning cybersecurity, cloud infrastructure, and software engineering."
          }
        />

        {/* Filter buttons */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 gap-1 flex-wrap justify-center">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "Toutes (17)" : "All (17)"}</span>
            </button>
            <button
              onClick={() => setSelectedFilter("security")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "security"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "Cybersécurité" : "Cybersecurity"}</span>
            </button>
            <button
              onClick={() => setSelectedFilter("cloud")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "cloud"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloud & Systèmes</span>
            </button>
            <button
              onClick={() => setSelectedFilter("code")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "code"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "Code & Data" : "Dev & Data"}</span>
            </button>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cert, index) => {
            const certUrl = cert.verificationUrl || cert.url;
            return (
              <div
                key={index}
                className="p-5 flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 card-hover shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {cert.platform || "Coursera"}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {cert.date || "2025"}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2">
                    {td(cert.name, cert.name_en)}
                  </h3>

                  {cert.description && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {td(cert.description, cert.description_en)}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                  {certUrl ? (
                    <a
                      href={certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{locale === "fr" ? "Vérifier le diplôme" : "Verify Credential"}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>{locale === "fr" ? "Certifié" : "Certified"}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
