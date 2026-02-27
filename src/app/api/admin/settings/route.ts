import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";
import type { SiteSettings } from "@/lib/admin-types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.settings);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const settings: SiteSettings = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      settings,
    }));
    return NextResponse.json(updated.settings);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}
