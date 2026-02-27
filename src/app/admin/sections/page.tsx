"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Section } from "@/lib/admin-types";

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette section ?")) return;
    await fetch("/api/admin/sections", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleEdit = (section: Section) => {
    setEditing(section.id);
    setForm(section);
  };

  const handleSaveEdit = async () => {
    if (!form.id || !form.title) return;
    setSaving(true);
    const updated = sections.map((s) =>
      s.id === form.id ? { ...s, ...form } : s
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

  const handleAdd = async () => {
    if (!form.id || !form.title || !form.component) return;
    setSaving(true);
    const newSection: Section = {
      id: form.id,
      title: form.title,
      icon: form.icon || "📄",
      enabled: form.enabled ?? true,
      order: sections.length,
      component: form.component,
    };
    const res = await fetch("/api/admin/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSection),
    });
    const data = await res.json();
    setSections(data.sort((a: Section, b: Section) => a.order - b.order));
    setAdding(false);
    setForm({});
    setSaving(false);
  };

  if (loading) {
    return <div className="text-muted-foreground text-sm p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sections</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérer les sections du portfolio — activer, réordonner, modifier
          </p>
        </div>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ enabled: true });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" />
          Nouvelle section
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-sm">Nouvelle section</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="ID (ex: certifications)"
              value={form.id || ""}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Titre (ex: Certifications)"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Icône (emoji, ex: 🏆)"
              value={form.icon || ""}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Composant (ex: CertificationsSection)"
              value={form.component || ""}
              onChange={(e) => setForm({ ...form, component: e.target.value })}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={saving || !form.id || !form.title || !form.component}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Ajout..." : "Ajouter"}
            </button>
            <button
              onClick={() => {
                setAdding(false);
                setForm({});
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm hover:bg-muted/80"
            >
              <X className="h-4 w-4" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Sections list */}
      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className="glass-card rounded-xl p-4 flex items-center gap-4"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />

            {editing === section.id ? (
              <div className="flex-1 grid sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Titre"
                />
                <input
                  type="text"
                  value={form.icon || ""}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Icône"
                />
                <input
                  type="text"
                  value={form.component || ""}
                  onChange={(e) => setForm({ ...form, component: e.target.value })}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Composant"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <span className="text-lg shrink-0">{section.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{section.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{section.component}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Reorder */}
              <button
                onClick={() => handleReorder(section.id, "up")}
                disabled={idx === 0}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
                title="Monter"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleReorder(section.id, "down")}
                disabled={idx === sections.length - 1}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30"
                title="Descendre"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>

              {/* Toggle */}
              <button
                onClick={() => handleToggle(section.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  section.enabled
                    ? "text-green-600 hover:bg-green-500/10"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                title={section.enabled ? "Désactiver" : "Activer"}
              >
                {section.enabled ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" />
                )}
              </button>

              {/* Edit */}
              {editing === section.id ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    disabled={saving}
                    className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Save className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setForm({});
                    }}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(section)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Modifier"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() => handleDelete(section.id)}
                className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
