import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json({ ok: true }); // Silencieux si pas configuré
  }

  try {
    const body = await request.json();
    const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 1000) : "";

    // IP du visiteur
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // User-Agent (anonymisé — on ne garde que les premières infos)
    const ua = (request.headers.get("user-agent") || "").slice(0, 300);

    // Insérer dans la table page_views
    await supabaseAdmin.from("page_views").insert({
      path,
      referrer,
      ip_hash: await hashIP(ip), // On hash l'IP pour la privacy
      user_agent: ua,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silencieux en cas d'erreur (tracking non-critique)
    return NextResponse.json({ ok: true });
  }
}

/**
 * Hash l'IP avec SHA-256 pour respecter la vie privée
 * tout en permettant le comptage de visiteurs uniques
 */
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (process.env.ADMIN_SECRET || "salt"));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16); // 16 chars suffisent pour l'unicité
}
