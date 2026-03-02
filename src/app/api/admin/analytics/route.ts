import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const EMPTY_RESPONSE = {
  daily: [],
  topPages: [],
  totalViews: 0,
  uniqueVisitors: 0,
  todayViews: 0,
};

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(EMPTY_RESPONSE);
  }

  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get("days");
    // 0 = tout l'historique, sinon nombre de jours
    const days = daysParam ? parseInt(daysParam, 10) : 30;

    const now = new Date();
    const startDate = days > 0
      ? new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      : null; // null = pas de limite

    // 1. Récupérer les vues
    let query = supabaseAdmin
      .from("page_views")
      .select("path, ip_hash, created_at")
      .order("created_at", { ascending: true });

    if (startDate) {
      query = query.gte("created_at", startDate.toISOString());
    }

    const { data: views, error } = await query;

    if (error) {
      console.error("[analytics] Supabase error:", error.message);
      return NextResponse.json(EMPTY_RESPONSE);
    }

    const allViews = views || [];

    // 2. Agrégation par jour
    const dailyMap = new Map<string, { views: number; uniqueIPs: Set<string> }>();
    const pageMap = new Map<string, number>();
    const allUniqueIPs = new Set<string>();

    const todayStr = now.toISOString().split("T")[0];
    let todayViews = 0;

    for (const view of allViews) {
      const dateStr = view.created_at.split("T")[0];

      // Daily aggregation
      if (!dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, { views: 0, uniqueIPs: new Set() });
      }
      const day = dailyMap.get(dateStr)!;
      day.views++;
      day.uniqueIPs.add(view.ip_hash);

      // Page counts
      pageMap.set(view.path, (pageMap.get(view.path) || 0) + 1);

      // Unique visitors
      allUniqueIPs.add(view.ip_hash);

      // Today
      if (dateStr === todayStr) todayViews++;
    }

    // Remplir les jours manquants (0 vues) pour un graphe continu
    const daily: { date: string; views: number; visitors: number }[] = [];
    const fillStart = startDate || (allViews.length > 0 ? new Date(allViews[0].created_at) : now);
    for (let d = new Date(fillStart); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const dayData = dailyMap.get(dateStr);
      daily.push({
        date: dateStr,
        views: dayData?.views || 0,
        visitors: dayData?.uniqueIPs.size || 0,
      });
    }

    // Top pages
    const topPages = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    return NextResponse.json({
      daily,
      topPages,
      totalViews: allViews.length,
      uniqueVisitors: allUniqueIPs.size,
      todayViews,
    });
  } catch (err) {
    console.error("[analytics] Exception:", err);
    return NextResponse.json(EMPTY_RESPONSE);
  }
}
