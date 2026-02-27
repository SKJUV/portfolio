"use client";

import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  MessageCircle,
  Power,
  PowerOff,
  Bot,
  GripVertical,
} from "lucide-react";
import type { ChatBotSettings, ChatBotCustomResponse } from "@/lib/admin-types";

const defaultSettings: ChatBotSettings = {
  enabled: true,
  botName: "Assistant IA",
  botDescription: "Tout savoir sur Juvenal",
  welcomeMessage: "",
  fallbackMessage: "",
  inputPlaceholder: "",
  customResponses: [],
};

export default function ChatBotAdminPage() {
  const [settings, setSettings] = useState<ChatBotSettings>(defaultSettings);
  const [original, setOriginal] = useState<ChatBotSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/chatbot")
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
      const res = await fetch("/api/admin/chatbot", {
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

  const handleReset = () => setSettings(original);

  const addCustomResponse = () => {
    const newResponse: ChatBotCustomResponse = {
      id: `cr-${Date.now()}`,
      keywords: [],
      response: "",
      enabled: true,
    };
    setSettings({
      ...settings,
      customResponses: [...settings.customResponses, newResponse],
    });
  };

  const updateCustomResponse = (id: string, updates: Partial<ChatBotCustomResponse>) => {
    setSettings({
      ...settings,
      customResponses: settings.customResponses.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    });
  };

  const removeCustomResponse = (id: string) => {
    setSettings({
      ...settings,
      customResponses: settings.customResponses.filter((r) => r.id !== id),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">🤖 Chatbot IA</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configurez l&apos;assistant IA du portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-3 py-2 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Annuler</span>
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

      {/* Activation */}
      <div className="admin-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${settings.enabled ? "bg-primary/10" : "bg-muted"}`}>
              <Bot className={`h-5 w-5 ${settings.enabled ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-sm font-medium">Chatbot {settings.enabled ? "actif" : "désactivé"}</p>
              <p className="text-xs text-muted-foreground">
                {settings.enabled
                  ? "Le chatbot est visible sur le portfolio"
                  : "Le chatbot est masqué du portfolio"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
            className={`p-2.5 rounded-xl transition-all ${
              settings.enabled
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {settings.enabled ? <Power className="h-5 w-5" /> : <PowerOff className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Apparence */}
      <div className="admin-card p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          Apparence
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Nom du bot</label>
            <input
              type="text"
              value={settings.botName}
              onChange={(e) => setSettings({ ...settings, botName: e.target.value })}
              placeholder="Assistant IA"
              className="admin-input"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Description</label>
            <input
              type="text"
              value={settings.botDescription}
              onChange={(e) => setSettings({ ...settings, botDescription: e.target.value })}
              placeholder="Tout savoir sur..."
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="admin-card p-5 space-y-4">
        <h2 className="font-semibold">💬 Messages</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Message d&apos;accueil</label>
            <textarea
              value={settings.welcomeMessage}
              onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
              placeholder="Bonjour ! 👋 Comment puis-je vous aider ?"
              rows={3}
              className="admin-input resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Message par défaut (quand le bot ne comprend pas)</label>
            <textarea
              value={settings.fallbackMessage}
              onChange={(e) => setSettings({ ...settings, fallbackMessage: e.target.value })}
              placeholder="Je ne suis pas sûr de comprendre..."
              rows={2}
              className="admin-input resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-medium">Placeholder du champ de saisie</label>
            <input
              type="text"
              value={settings.inputPlaceholder}
              onChange={(e) => setSettings({ ...settings, inputPlaceholder: e.target.value })}
              placeholder="Posez une question..."
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* Réponses personnalisées */}
      <div className="admin-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">🎯 Réponses personnalisées</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Définissez des mots-clés et la réponse associée. Prioritaires sur les réponses auto.
            </p>
          </div>
          <button
            onClick={addCustomResponse}
            className="admin-btn-primary text-xs px-3 py-2"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>

        {settings.customResponses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <GripVertical className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Aucune réponse personnalisée</p>
            <p className="text-xs mt-1">Les réponses automatiques seront utilisées</p>
          </div>
        ) : (
          <div className="space-y-3">
            {settings.customResponses.map((cr) => (
              <div
                key={cr.id}
                className={`border rounded-xl p-4 space-y-3 transition-all ${
                  cr.enabled ? "border-border" : "border-border/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground font-medium">
                        Mots-clés (séparés par des virgules)
                      </label>
                      <input
                        type="text"
                        value={cr.keywords.join(", ")}
                        onChange={(e) =>
                          updateCustomResponse(cr.id, {
                            keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                          })
                        }
                        placeholder="ex: tarif, prix, coût"
                        className="admin-input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground font-medium">Réponse</label>
                      <textarea
                        value={cr.response}
                        onChange={(e) => updateCustomResponse(cr.id, { response: e.target.value })}
                        placeholder="La réponse que le bot affichera..."
                        rows={2}
                        className="admin-input resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => updateCustomResponse(cr.id, { enabled: !cr.enabled })}
                      className={`p-1.5 rounded-lg transition-colors ${
                        cr.enabled
                          ? "text-primary hover:bg-primary/10"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                      title={cr.enabled ? "Désactiver" : "Activer"}
                    >
                      {cr.enabled ? <Power className="h-3.5 w-3.5" /> : <PowerOff className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => removeCustomResponse(cr.id)}
                      className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
