"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Eye, EyeOff, Clock, User, ChevronDown, ChevronUp, Inbox } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data.messages || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error("Erreur chargement messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (msg: Message) => {
    await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg.id, read: !msg.read }),
    });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    if (expandedId === id) setExpandedId(null);
    fetchMessages();
  };

  const expandMessage = async (msg: Message) => {
    const newId = expandedId === msg.id ? null : msg.id;
    setExpandedId(newId);
    // Marquer comme lu automatiquement quand on ouvre
    if (newId && !msg.read) {
      await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, read: true }),
      });
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">📨 Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {messages.length} message{messages.length !== 1 ? "s" : ""}{" "}
            {unreadCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium ml-1">
                {unreadCount} non lu{unreadCount !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Tous" : f === "unread" ? "Non lus" : "Lus"}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des messages */}
      {filteredMessages.length === 0 ? (
        <div className="admin-card p-8 sm:p-12 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {filter === "all" ? "Aucun message reçu" : `Aucun message ${filter === "unread" ? "non lu" : "lu"}`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`admin-card overflow-hidden transition-all ${
                !msg.read ? "border-l-4 border-l-primary" : ""
              }`}
            >
              {/* En-tête du message (cliquable) */}
              <button
                onClick={() => expandMessage(msg)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div
                  className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${
                    msg.read ? "bg-muted-foreground/20" : "bg-primary"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm truncate ${!msg.read ? "font-semibold" : ""}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <p className={`text-sm truncate ${!msg.read ? "font-medium" : "text-muted-foreground"}`}>
                    {msg.subject}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {formatDate(msg.date)}
                  </span>
                  {expandedId === msg.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Corps du message (expandable) */}
              {expandedId === msg.id && (
                <div className="border-t border-border/50 p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{msg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-primary hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{formatDate(msg.date)}</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => toggleRead(msg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      {msg.read ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Marquer non lu
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Marquer lu
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" /> Répondre
                    </a>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-destructive hover:bg-destructive/10 transition-colors ml-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
