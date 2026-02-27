"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, Save, X, Award, ExternalLink, Upload, Image as ImageIcon } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/certifications")
      .then((res) => res.json())
      .then(setCertifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, imageUrl: data.url });
      } else {
        alert(data.error || "Erreur lors de l'upload");
      }
    } catch {
      alert("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
        <div className="admin-card p-4 sm:p-6 space-y-4">
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
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Plateforme</label>
              <input
                type="text"
                placeholder="Coursera, Udemy, Google..."
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Date d&apos;obtention</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Lien de vérification</label>
              <input
                type="url"
                placeholder="https://coursera.org/verify/..."
                value={form.verificationUrl || ""}
                onChange={(e) => setForm({ ...form, verificationUrl: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-muted-foreground font-medium">Image de la certification</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Preview */}
                {form.imageUrl && (
                  <div className="relative shrink-0 w-32 h-24 rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  {/* File upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cert-image-upload"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all w-full justify-center disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        Upload en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        {form.imageUrl ? "Changer l'image" : "Importer une image"}
                      </>
                    )}
                  </button>
                  {/* OR: URL */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">ou URL</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com/cert.png"
                    value={form.imageUrl || ""}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description</label>
            <textarea
              placeholder="Description de la certification..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="admin-input resize-none"
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
        <div className="admin-card p-8 sm:p-12 text-center">
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
            <div key={cert.id} className="admin-card p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Image thumbnail */}
                {cert.imageUrl && (
                  <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-border bg-muted">
                    <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover" />
                  </div>
                )}
                {!cert.imageUrl && (
                  <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-border bg-muted flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
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
