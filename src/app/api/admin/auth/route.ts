import { NextResponse } from "next/server";
import { login, logout } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action } = body;

    if (action === "logout") {
      await logout();
      return NextResponse.json({ success: true });
    }

    if (!password) {
      return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });
    }

    const success = await login(password);
    if (!success) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
