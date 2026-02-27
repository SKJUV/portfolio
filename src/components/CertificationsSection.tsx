"use client";

import { Award, ExternalLink } from "lucide-react";
import type { PortfolioData } from "@/lib/admin-types";

export default function CertificationsSection({ data }: { data: PortfolioData }) {
  const { certifications } = data;

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">
            🏅 Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mes certifications et accréditations professionnelles
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-2xl p-6 space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start gap-4">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cert.platform}
                  </p>
                </div>
              </div>

              {cert.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground font-mono">
                  {cert.date}
                </span>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Vérifier
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
