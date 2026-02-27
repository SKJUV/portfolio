import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";

// GET — Récupérer tous les messages
export async function GET() {
  try {
    const data = await getPortfolioData();
    const messages = data.messages || [];
    const unreadCount = messages.filter((m) => !m.read).length;
    return NextResponse.json({ messages, unreadCount });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT — Marquer un message comme lu/non-lu
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    let found = false;
    await updatePortfolioData((data) => {
      if (!data.messages) data.messages = [];
      const msg = data.messages.find((m) => m.id === id);
      if (msg) {
        msg.read = typeof read === "boolean" ? read : !msg.read;
        found = true;
      }
      return data;
    });

    if (!found) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — Supprimer un message
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    let found = false;
    await updatePortfolioData((data) => {
      if (!data.messages) data.messages = [];
      const idx = data.messages.findIndex((m) => m.id === id);
      if (idx !== -1) {
        data.messages.splice(idx, 1);
        found = true;
      }
      return data;
    });

    if (!found) {
      return NextResponse.json({ error: "Message non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
