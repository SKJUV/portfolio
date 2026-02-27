import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.ADMIN_SECRET || "change-me-in-production-please";
const SESSION_COOKIE = "admin_session";

// Web Crypto-based HMAC verification (Edge-compatible)
async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const payload = atob(payloadB64);
    const expectedSig = await hmacSign(payload);

    if (signature !== expectedSig) return false;

    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return false;
    if (data.role !== "admin") return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token || !(await verifySessionToken(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protéger les routes API admin
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token || !(await verifySessionToken(token))) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
