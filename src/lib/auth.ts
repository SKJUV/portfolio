import { cookies } from "next/headers";
import crypto from "crypto";

// Secret pour signer les sessions — utiliser ADMIN_SECRET dans .env.local
const SECRET = process.env.ADMIN_SECRET || "change-me-in-production-please";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

/**
 * Créer un token de session signé avec HMAC
 */
function createSessionToken(): string {
  const payload = JSON.stringify({
    role: "admin",
    exp: Date.now() + SESSION_DURATION,
    nonce: crypto.randomBytes(16).toString("hex"),
  });
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + signature;
  return token;
}

/**
 * Vérifier un token de session
 */
function verifySessionToken(token: string): boolean {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");

    // Comparaison en temps constant
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return false;
    }

    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return false;
    if (data.role !== "admin") return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Connecter l'admin — vérifier le mot de passe et créer une session
 */
export async function login(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD) return false;

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  return true;
}

/**
 * Déconnecter l'admin
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Vérifier si l'utilisateur est authentifié
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

/**
 * Vérifier un token brut (pour le middleware)
 */
export function verifyToken(token: string): boolean {
  return verifySessionToken(token);
}
