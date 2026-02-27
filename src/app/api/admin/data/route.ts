import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/data-manager";

// Point d'accès pour récupérer toutes les données (pour le dashboard overview)
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}
