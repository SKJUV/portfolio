import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";
import type { Certification } from "@/lib/admin-types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.certifications);
  } catch {
    return NextResponse.json({ error: "Erreur lecture données" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cert: Certification = await request.json();
    if (!cert.id) {
      cert.id = crypto.randomUUID();
    }
    const updated = await updatePortfolioData((data) => ({
      ...data,
      certifications: [...data.certifications, cert],
    }));
    return NextResponse.json(updated.certifications);
  } catch {
    return NextResponse.json({ error: "Erreur ajout certification" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cert: Certification = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      certifications: data.certifications.map((c) => (c.id === cert.id ? cert : c)),
    }));
    return NextResponse.json(updated.certifications);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const updated = await updatePortfolioData((data) => ({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    }));
    return NextResponse.json(updated.certifications);
  } catch {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
