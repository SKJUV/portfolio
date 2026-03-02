"use client";

import { useEffect, useRef } from "react";

/**
 * Composant invisible qui enregistre chaque page vue
 * dans notre table Supabase `page_views` via l'API /api/analytics/track
 */
export default function PageViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const path = window.location.pathname;
    const referrer = document.referrer || "";

    // Ne pas tracker les pages admin
    if (path.startsWith("/admin")) return;

    // Envoyer de manière non-bloquante via sendBeacon ou fetch
    const payload = JSON.stringify({ path, referrer });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  return null;
}
