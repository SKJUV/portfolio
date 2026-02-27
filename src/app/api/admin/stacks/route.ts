import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";
import type { Technology } from "@/lib/admin-types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.technologies);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const tech: Technology = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      technologies: [...data.technologies, tech],
    }));
    return NextResponse.json(updated.technologies);
  } catch {
    return NextResponse.json({ error: "Erreur ajout technologie" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const tech: Technology = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      technologies: data.technologies.map((t) => (t.id === tech.id ? tech : t)),
    }));
    return NextResponse.json(updated.technologies);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      technologies: data.technologies.filter((t) => t.id !== id),
    }));
    return NextResponse.json(updated.technologies);
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
