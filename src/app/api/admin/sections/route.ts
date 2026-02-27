import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.sections);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const sections = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      sections,
    }));
    return NextResponse.json(updated.sections);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newSection = await request.json();
    const updated = await updatePortfolioData((data) => {
      const maxOrder = Math.max(...data.sections.map((s) => s.order), -1);
      return {
        ...data,
        sections: [
          ...data.sections,
          { ...newSection, order: maxOrder + 1 },
        ],
      };
    });
    return NextResponse.json(updated.sections);
  } catch {
    return NextResponse.json({ error: "Erreur ajout section" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      sections: data.sections.filter((s) => s.id !== id),
    }));
    return NextResponse.json(updated.sections);
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
