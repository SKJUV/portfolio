import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/data-manager";

// API publique — pas besoin d'auth
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}
