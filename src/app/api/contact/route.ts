import { NextResponse } from "next/server";
import { updatePortfolioData } from "@/lib/data-manager";
import { createRateLimiter, getClientIP } from "@/lib/rate-limit";

// Rate limiter : 3 messages par 10 minutes par IP
const contactLimiter = createRateLimiter("contact", {
  maxRequests: 3,
  windowMs: 10 * 60 * 1000,
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    const { success, resetAt } = contactLimiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de messages envoyés. Veuillez patienter quelques minutes." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis (nom, email, objet, message)" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (typeof subject !== "string" || subject.length > 200) {
      return NextResponse.json({ error: "Objet trop long (max 200 caractères)" }, { status: 400 });
    }
    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json({ error: "Message trop long (max 5000 caractères)" }, { status: 400 });
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
      read: false,
    };

    await updatePortfolioData((data) => {
      if (!data.messages) data.messages = [];
      data.messages.unshift(newMessage); // Plus récent en premier
      return data;
    });

    return NextResponse.json({ success: true, message: "Message envoyé avec succès !" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
