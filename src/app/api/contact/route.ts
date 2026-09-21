import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createRateLimiter, getClientIP } from "@/lib/rate-limit";

// Rate limiter : 3 messages par 10 minutes par IP
const contactLimiter = createRateLimiter("contact", {
  maxRequests: 3,
  windowMs: 10 * 60 * 1000,
});

const MESSAGES_FILE = path.join(process.cwd(), "src", "data", "messages.json");

function getStoredMessages(): Array<Record<string, unknown>> {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("[Contact API] Error reading messages:", err);
  }
  return [];
}

function saveMessages(messages: Array<Record<string, unknown>>) {
  try {
    const dir = path.dirname(MESSAGES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.error("[Contact API] Error writing messages:", err);
  }
}

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

    if (typeof name !== "string" || name.trim().length > 100) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (typeof subject !== "string" || subject.trim().length > 200) {
      return NextResponse.json({ error: "Objet trop long (max 200 caractères)" }, { status: 400 });
    }
    if (typeof message !== "string" || message.trim().length > 5000) {
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

    const messages = getStoredMessages();
    messages.unshift(newMessage);
    saveMessages(messages);

    return NextResponse.json({ success: true, message: "Message reçu avec succès" });
  } catch (error) {
    console.error("[Contact API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur lors de l'enregistrement du message" },
      { status: 500 }
    );
  }
}
