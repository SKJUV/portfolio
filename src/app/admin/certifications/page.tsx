"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/lib/admin-types";

const emptyCert: Certification = {
  id: "",
  name: "",
  platform: "",
  date: "",
  description: "",
  verificationUrl: "",
  imageUrl: "",
};

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Certification>(emptyCert);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/certifications")
      .then((res) => res.json())
      .then(setCertifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.name || !form.platform) return;
    setSaving(true);
    const method = adding ? "POST" : "PUT";
    const body = adding ? { ...form, id: crypto.randomUUID() } : form;
    const res = await fetch("/api/admin/certifications", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setCertifications(data);
    setEditing(null);
    setAdding(false);
    setForm(emptyCert);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette certification ?")) return;
    const res = await fetch("/api/admin/certifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setCertifications(data);
  };

  const handleEdit = (cert: Certification) => {
    setEditing(cert.id);
    setForm(cert);
    setAdding(false);
  };

  const handleCancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(emptyCert);
  };

  if (loading) {
    return <div className="text-muted-foreground text-sm p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {certifications.length} certification(s) — gérer vos diplômes et formations
          </p>
        </div>
        {!adding && !editing && (
          <button
            onClick={() => {
              setAdding(true);
              setForm(emptyCert);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            Nouvelle certification
          </button>
        )}
      </div>

      {/* Form */}
      {(adding || editing) && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">
            {adding ? "Nouvelle certification" : "Modifier la certification"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Nom</label>
              <input
                type="text"
                placeholder="Google Cybersecurity Certificate"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Plateforme</label>
              <input
                type="text"
                placeholder="Coursera, Udemy, Google..."
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Date d&apos;obtention</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Lien de vérification</label>
              <input
                type="url"
                placeholder="https://coursera.org/verify/..."
                value={form.verificationUrl || ""}
                onChange={(e) => setForm({ ...form, verificationUrl: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">URL de l&apos;image</label>
              <input
                type="url"
                placeholder="https://example.com/cert.png"
                value={form.imageUrl || ""}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description</label>
            <textarea
              placeholder="Description de la certification..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary resize-none"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.platform}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Sauvegarde..." : adding ? "Ajouter" : "Enregistrer"}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl text-sm hover:bg-muted/80"
            >
              <X className="h-4 w-4" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Certifications list */}
      {certifications.length === 0 && !adding ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Aucune certification pour le moment
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ajoutez votre première certification pour l&apos;afficher sur le portfolio
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-amber-500 shrink-0" />
                    <h3 className="font-semibold truncate">{cert.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-lg">
                      {cert.platform}
                    </span>
                    {cert.date && (
                      <span className="text-xs">
                        {new Date(cert.date).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                  </div>
                  {cert.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Vérifier"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
