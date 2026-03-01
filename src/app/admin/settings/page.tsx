"use client";

import { useEffect, useState, useRef } from "react";
import { Save, RotateCcw, Upload, X, User } from "lucide-react";
import type { SiteSettings } from "@/lib/admin-types";

const defaultSettings: SiteSettings = {
  siteTitle: "",
  siteDescription: "",
  heroTitle: "",
  heroSubtitle: "",
  heroDescription: "",
  profileImageUrl: "",
  footerText: "",
  contactEmail: "",
  contactGithub: "",
  contactLinkedin: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [original, setOriginal] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setOriginal(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(original);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      setSettings(data);
      setOriginal(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(original);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, profileImageUrl: data.url });
      } else {
        alert(data.error || "Erreur upload");
      }
    } catch {
      alert("Erreur lors de l'upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return <div className="text-muted-foreground text-sm p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Personnalisation</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Modifier les textes globaux, le SEO et les informations de contact
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Annuler
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="admin-btn-primary px-4 py-2.5"
          >
            <Save className="h-4 w-4" />
            {saving ? "Sauvegarde..." : saved ? "Sauvegardé ✓" : "Enregistrer"}
          </button>
        </div>
      </div>

      {/* SEO */}
      <div className="admin-card p-4 sm:p-6 space-y-4">
        <h2 className="font-semibold">🔍 SEO & Métadonnées</h2>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Titre du site (balise title)</label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description du site (meta description)</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={2}
              className="admin-input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="admin-card p-4 sm:p-6 space-y-4">
        <h2 className="font-semibold">🏠 Section Hero</h2>
        <div className="space-y-3">
          {/* Photo de profil */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Photo de profil</label>
            <div className="flex items-center gap-4">
              {settings.profileImageUrl ? (
                <div className="relative shrink-0">
                  <img src={settings.profileImageUrl} alt="Profil" className="h-20 w-20 rounded-xl object-cover border border-border" />
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, profileImageUrl: "" })}
                    className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-20 w-20 rounded-xl border border-dashed border-border bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground/30" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-50"
                >
                  {uploading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" /> Upload...</>
                  ) : (
                    <><Upload className="h-4 w-4" /> {settings.profileImageUrl ? "Changer" : "Importer"}</>
                  )}
                </button>
                <input
                  type="url"
                  placeholder="ou URL: https://..."
                  value={settings.profileImageUrl || ""}
                  onChange={(e) => setSettings({ ...settings, profileImageUrl: e.target.value })}
                  className="admin-input text-xs"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Titre principal</label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Sous-titre</label>
            <input
              type="text"
              value={settings.heroSubtitle}
              onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description</label>
            <textarea
              value={settings.heroDescription}
              onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
              rows={3}
              className="admin-input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="admin-card p-4 sm:p-6 space-y-4">
        <h2 className="font-semibold">📬 Contact</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs text-muted-foreground font-medium">Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">GitHub URL</label>
            <input
              type="url"
              value={settings.contactGithub}
              onChange={(e) => setSettings({ ...settings, contactGithub: e.target.value })}
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">LinkedIn URL</label>
            <input
              type="url"
              value={settings.contactLinkedin}
              onChange={(e) => setSettings({ ...settings, contactLinkedin: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-card p-4 sm:p-6 space-y-4">
        <h2 className="font-semibold">📄 Footer</h2>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground font-medium">Texte du footer</label>
          <input
            type="text"
            value={settings.footerText}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="admin-input"
          />
        </div>
      </div>
    </div>
  );
}
