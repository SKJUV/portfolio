"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import type { Technology } from "@/lib/admin-types";

const categories = [
  { value: "frontend", label: "Frontend", color: "text-blue-500 bg-blue-500/10" },
  { value: "backend", label: "Backend", color: "text-green-500 bg-green-500/10" },
  { value: "devops", label: "DevOps", color: "text-purple-500 bg-purple-500/10" },
  { value: "security", label: "Sécurité", color: "text-red-500 bg-red-500/10" },
  { value: "data", label: "Data / IA", color: "text-amber-500 bg-amber-500/10" },
  { value: "other", label: "Autre", color: "text-muted-foreground bg-muted" },
];

const emptyTech: Technology = { id: "", name: "", category: "frontend" };

export default function StacksPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Technology>(emptyTech);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/stacks")
      .then((res) => res.json())
      .then(setTechnologies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.id || !form.name) return;
    setSaving(true);
    const method = adding ? "POST" : "PUT";
    const res = await fetch("/api/admin/stacks", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setTechnologies(data);
    setEditing(null);
    setAdding(false);
    setForm(emptyTech);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette technologie ?")) return;
    const res = await fetch("/api/admin/stacks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setTechnologies(data);
  };

  const handleEdit = (tech: Technology) => {
    setEditing(tech.id);
    setForm(tech);
    setAdding(false);
  };

  const handleCancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(emptyTech);
  };

  const getCategoryStyle = (cat: string) =>
    categories.find((c) => c.value === cat)?.color || "text-muted-foreground bg-muted";

  const filtered =
    filter === "all" ? technologies : technologies.filter((t) => t.category === filter);

  if (loading) {
    return <div className="text-muted-foreground text-sm p-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Technologies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {technologies.length} technologie(s) dans votre stack
          </p>
        </div>
        {!adding && !editing && (
          <button
            onClick={() => {
              setAdding(true);
              setForm(emptyTech);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            Nouvelle techno
          </button>
        )}
      </div>

      {/* Add/Edit form */}
      {(adding || editing) && (
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-sm">
            {adding ? "Nouvelle technologie" : "Modifier la technologie"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">ID</label>
              <input
                type="text"
                placeholder="react, docker..."
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={!!editing}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Nom</label>
              <input
                type="text"
                placeholder="React, Docker..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as Technology["category"] })
                }
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.id || !form.name}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Sauvegarde..." : adding ? "Ajouter" : "Enregistrer"}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm hover:bg-muted/80"
            >
              <X className="h-4 w-4" />
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === "all"
              ? "bg-primary/10 text-primary"
              : "bg-muted/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          Tout ({technologies.length})
        </button>
        {categories.map((cat) => {
          const count = technologies.filter((t) => t.category === cat.value).length;
          return (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === cat.value
                  ? cat.color
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Technologies grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filtered.map((tech) => (
          <div
            key={tech.id}
            className="glass-card rounded-xl px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${getCategoryStyle(tech.category)}`}>
                {tech.category}
              </span>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(tech)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleDelete(tech.id)}
                className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
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
