"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

type ProjectForm = Omit<Project, "badgeType"> & {
  badgeType: string;
  status?: string;
};

const emptyProject: ProjectForm = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  badge: "",
  badgeType: "academic",
  stack: [],
  securityPoints: [],
  githubUrl: "",
  liveUrl: "",
  status: "in-progress",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyProject);
  const [saving, setSaving] = useState(false);
  const [stackInput, setStackInput] = useState("");
  const [securityInput, setSecurityInput] = useState("");

  const loadProjects = async () => {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async () => {
    if (!form.id || !form.title) return;
    setSaving(true);

    const method = adding ? "POST" : "PUT";
    const res = await fetch("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setProjects(data);
    setEditing(null);
    setAdding(false);
    setForm(emptyProject);
    setStackInput("");
    setSecurityInput("");
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    const res = await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setProjects(data);
  };

  const handleEdit = (project: ProjectForm) => {
    setEditing(project.id);
    setForm(project);
    setStackInput(project.stack.join(", "));
    setSecurityInput(project.securityPoints.join(", "));
    setAdding(false);
  };

  const handleCancel = () => {
    setEditing(null);
    setAdding(false);
    setForm(emptyProject);
    setStackInput("");
    setSecurityInput("");
  };

  const updateStack = (value: string) => {
    setStackInput(value);
    setForm({
      ...form,
      stack: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  const updateSecurity = (value: string) => {
    setSecurityInput(value);
    setForm({
      ...form,
      securityPoints: value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  if (loading) {
    return <div className="text-muted-foreground text-sm p-8">Chargement...</div>;
  }

  const isFormOpen = adding || editing;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} projet(s) — ajouter, modifier ou supprimer
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={() => {
              setAdding(true);
              setForm(emptyProject);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all"
          >
            <Plus className="h-4 w-4" />
            Nouveau projet
          </button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="admin-card p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold">
            {adding ? "Nouveau projet" : `Modifier : ${form.title}`}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">ID (slug)</label>
              <input
                type="text"
                placeholder="mon-projet"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={!!editing}
                className="admin-input disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Titre</label>
              <input
                type="text"
                placeholder="Mon Projet"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Sous-titre</label>
              <input
                type="text"
                placeholder="Description courte"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Badge</label>
              <input
                type="text"
                placeholder="EdTech, Sécurité..."
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Type de badge</label>
              <select
                value={form.badgeType}
                onChange={(e) => setForm({ ...form, badgeType: e.target.value })}
                className="admin-input"
              >
                <option value="security">Sécurité</option>
                <option value="education">Éducation</option>
                <option value="university">Université</option>
                <option value="academic">Académique</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Statut</label>
              <select
                value={form.status || "completed"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="admin-input"
              >
                <option value="in-progress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Lien GitHub</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">Lien démo (optionnel)</label>
              <input
                type="url"
                placeholder="https://demo.example.com"
                value={form.liveUrl || ""}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description</label>
            <textarea
              placeholder="Description complète du projet..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="admin-input resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">
                Stack (séparées par des virgules)
              </label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, Firebase"
                value={stackInput}
                onChange={(e) => updateStack(e.target.value)}
                className="admin-input"
              />
              {form.stack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {form.stack.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-medium">
                Points sécurité (séparés par des virgules)
              </label>
              <input
                type="text"
                placeholder="Firebase Auth, RBAC, Validation serveur"
                value={securityInput}
                onChange={(e) => updateSecurity(e.target.value)}
                className="admin-input"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.id || !form.title}
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

      {/* Projects list */}
      <div className="grid gap-3">
        {projects.map((project) => (
          <div key={project.id} className="admin-card p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{project.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-lg ${
                      (project.status || "completed") === "completed"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {(project.status || "completed") === "completed" ? "Terminé" : "En cours"}
                  </span>
                </div>
                <p className="text-sm text-primary mb-1">{project.subtitle}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title="GitHub"
                  >
                    <Github className="h-4 w-4 text-muted-foreground" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title="Démo"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Modifier"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
