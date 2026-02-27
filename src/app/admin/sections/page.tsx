"use client";

import { useEffect, useState } from "react";
import {
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  Layers,
} from "lucide-react";
import type { Section } from "@/lib/admin-types";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Section>>({});
  const [saving, setSaving] = useState(false);

  const loadSections = async () => {
    const res = await fetch("/api/admin/sections");
    const data = await res.json();
    setSections(data.sort((a: Section, b: Section) => a.order - b.order));
    setLoading(false);
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleToggle = async (id: string) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    setSections(updated);
    await fetch("/api/admin/sections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const sorted = [...sections].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => s.id === id);
    if (
      (direction === "up" && idx === 0) ||
      (direction === "down" && idx === sorted.length - 1)
    )
      return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const tempOrder = sorted[idx].order;
    sorted[idx].order = sorted[swapIdx].order;
    sorted[swapIdx].order = tempOrder;

    const reordered = sorted.sort((a, b) => a.order - b.order);
    setSections(reordered);
    await fetch("/api/admin/sections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered),
    });
  };

  const handleEdit = (section: Section) => {
    setEditing(section.id);
    setForm({ title: section.title, icon: section.icon });
  };

  const handleSaveEdit = async () => {
    if (!form.title) return;
    setSaving(true);
    const updated = sections.map((s) =>
      s.id === editing ? { ...s, title: form.title || s.title, icon: form.icon || s.icon } : s
    );
    await fetch("/api/admin/sections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setSections(updated);
    setEditing(null);
    setForm({});
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          Sections
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {enabledCount}/{sections.length} section(s) actives — Réordonnez, activez/désactivez ou renommez
        </p>
      </div>

      {/* Info card */}
      <div className="admin-card p-4 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
          <Layers className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium">Sections prédéfinies</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Les sections du portfolio sont verrouillées. Vous pouvez les activer/désactiver,
            changer leur ordre d&apos;affichage et modifier leur titre et icône.
          </p>
        </div>
      </div>

      {/* Sections list */}
      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`admin-card p-3 sm:p-4 transition-all ${
              !section.enabled ? "opacity-60" : ""
            }`}
          >
            {editing === section.id ? (
              /* Mode édition */
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Pencil className="h-3.5 w-3.5" />
                  Modification de &quot;{section.title}&quot;
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Titre</label>
                    <input
                      type="text"
                      value={form.title || ""}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="admin-input"
                      placeholder="Titre de la section"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Icône (emoji)</label>
                    <input
                      type="text"
                      value={form.icon || ""}
                      onChange={(e) => setForm({ ...form, icon: e.target.value })}
                      className="admin-input"
                      placeholder="🔒"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    disabled={saving || !form.title}
                    className="admin-btn-primary text-xs py-2 px-3"
                  >
                    <Save className="h-3.5 w-3.5" />
                    {saving ? "..." : "Sauvegarder"}
                  </button>
                  <button
                    onClick={() => { setEditing(null); setForm({}); }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-muted rounded-xl text-xs hover:bg-muted/80 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              /* Mode affichage */
              <div className="flex items-center gap-2 sm:gap-4">
                <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0 hidden sm:block" />

                {/* Info section */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="text-lg sm:text-xl shrink-0">{section.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{section.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {section.component} · Ordre {section.order}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleReorder(section.id, "up")}
                    disabled={idx === 0}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-20"
                    title="Monter"
                  >
                    <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    onClick={() => handleReorder(section.id, "down")}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-20"
                    title="Descendre"
                  >
                    <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>

                  <button
                    onClick={() => handleToggle(section.id)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      section.enabled
                        ? "text-green-600 hover:bg-green-500/10"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    title={section.enabled ? "Désactiver" : "Activer"}
                  >
                    {section.enabled ? (
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(section)}
                    className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Modifier"
                  >
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
