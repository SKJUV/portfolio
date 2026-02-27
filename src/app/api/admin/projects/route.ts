import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";
import type { Project } from "@/lib/types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.projects);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project: Project = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      projects: [...data.projects, project],
    }));
    return NextResponse.json(updated.projects);
  } catch {
    return NextResponse.json({ error: "Erreur ajout projet" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const project: Project = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      projects: data.projects.map((p) => (p.id === project.id ? project : p)),
    }));
    return NextResponse.json(updated.projects);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    }));
    return NextResponse.json(updated.projects);
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
