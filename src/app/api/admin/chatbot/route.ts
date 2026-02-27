import { NextResponse } from "next/server";
import { getPortfolioData, updatePortfolioData } from "@/lib/data-manager";
import type { ChatBotSettings } from "@/lib/admin-types";

// GET — Récupérer les paramètres du chatbot
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data.chatBotSettings || {
      enabled: true,
      botName: "Assistant IA",
      botDescription: "Tout savoir sur Juvenal",
      welcomeMessage: "Bonjour ! 👋",
      fallbackMessage: "Je ne peux répondre qu'aux questions sur ce portfolio.",
      inputPlaceholder: "Posez une question...",
      customResponses: [],
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT — Mettre à jour les paramètres du chatbot
export async function PUT(request: Request) {
  try {
    const body: ChatBotSettings = await request.json();

    await updatePortfolioData((data) => {
      data.chatBotSettings = {
        enabled: body.enabled ?? true,
        botName: body.botName || "Assistant IA",
        botDescription: body.botDescription || "",
        welcomeMessage: body.welcomeMessage || "Bonjour !",
        fallbackMessage: body.fallbackMessage || "Je ne comprends pas cette question.",
        inputPlaceholder: body.inputPlaceholder || "Posez une question...",
        customResponses: body.customResponses || [],
      };
      return data;
    });

    const updated = await getPortfolioData();
    return NextResponse.json(updated.chatBotSettings);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
