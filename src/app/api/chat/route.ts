import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getSettings,
  getProjects,
  getSkills,
  getSecuritySkills,
  getCertifications,
  getAbout,
} from "@/lib/content";
import githubReposData from "@/data/github-repos.json";
import { createRateLimiter, getClientIP } from "@/lib/rate-limit";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Rate limiter : 15 messages par minute par IP
const chatLimiter = createRateLimiter("chat", {
  maxRequests: 15,
  windowMs: 60 * 1000,
});

const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"];

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  languages: Record<string, number>;
  url: string;
  homepage: string | null;
  topics: string[];
  stars: number;
  forks: number;
}

function getGitHubRepos(): GitHubRepo[] {
  return (githubReposData || []) as unknown as GitHubRepo[];
}

function formatGitHubRepos(repos: GitHubRepo[]): string {
  if (!repos || repos.length === 0) return "";
  const repoLines = repos
    .slice(0, 10)
    .map((r) => `- ${r.name}: ${r.description || "Repo public"}. Langage: ${r.language || "N/A"}. URL: ${r.url}`)
    .join("\n");
  return `\n\n=== REPOS GITHUB PUBLICS ===\n${repoLines}`;
}

function buildPortfolioContext(): string {
  const settings = getSettings();
  const projects = getProjects();
  const skills = getSkills();
  const securitySkills = getSecuritySkills();
  const certs = getCertifications();
  const about = getAbout();
  const repos = getGitHubRepos();

  const projectsList = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.subtitle}. ${p.description}. Stack: ${p.stack.join(", ")}. Sécurité: ${p.securityPoints.join(", ")}. GitHub: ${p.githubUrl || "N/A"}`
    )
    .join("\n");

  const securityList = securitySkills
    .map((s) => `- ${s.title}: ${s.description} Tags: ${s.tags.join(", ")}`)
    .join("\n");

  const skillsList = skills
    .map((c) => `- ${c.title}: ${c.items.join(", ")}`)
    .join("\n");

  const certList = certs
    .map((c) => `- ${c.name} (${c.platform}, ${c.date}): ${c.description || ""}`)
    .join("\n");

  return `
Tu es l'assistant IA du portfolio professionnel de SINENG KENGNI Juvenal (pseudo: SKJUV).
Tu réponds UNIQUEMENT aux questions sur Juvenal, ses projets, ses compétences techniques en cybersécurité et full-stack, et son parcours.
Pour toute question hors-sujet, refuse poliment en indiquant ta spécialisation.

Style : Naturel, précis, courtois, professionnel.
Langue : Réponds dans la langue posée (français ou anglais).

=== PROFIL & BIO ===
Nom : ${settings.heroTitle}
Titre : ${settings.heroSubtitle}
Description : ${settings.heroDescription}
Contact : Email: ${settings.contactEmail} | GitHub: ${settings.contactGithub} | LinkedIn: ${settings.contactLinkedin}
Formation : Université de Yaoundé 1, GDSC, GDG Yaoundé, Django Cameroon.

=== PROJETS RÉALISÉS (${projects.length}) ===
${projectsList}

=== STANDARDS & PRATIQUES SÉCURITÉ ===
${securityList}

=== ARSENAL TECHNIQUE ===
${skillsList}

=== CERTIFICATIONS COURSERA / IBM / GOOGLE CLOUD (${certs.length}) ===
${certList}
${formatGitHubRepos(repos)}
`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const { success, resetAt } = chatLimiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter un instant." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
          },
        }
      );
    }

    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Message trop long (max 1000 caractères)" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Clé API Gemini non configurée", fallback: true },
        { status: 503 }
      );
    }

    const systemContext = buildPortfolioContext();
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const chatHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    let lastError: unknown = null;
    for (const modelName of GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemContext,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        });

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response, model: modelName });
      } catch (err) {
        lastError = err;
      }
    }

    console.error("[Chat API] All Gemini models failed:", lastError);
    return NextResponse.json({ error: "Service IA indisponible", fallback: true }, { status: 500 });
  } catch (error) {
    console.error("[Chat API] Error:", error);
    return NextResponse.json({ error: "Erreur interne", fallback: true }, { status: 500 });
  }
}
