import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPortfolioData } from "@/lib/data-manager";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Modèles à essayer dans l'ordre (le premier disponible sera utilisé)
const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];

// ============================================
// Cache des repos GitHub (refresh toutes les heures)
// ============================================
interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
}

let cachedRepos: GitHubRepo[] = [];
let reposCacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure

async function fetchGitHubRepos(githubUrl: string): Promise<GitHubRepo[]> {
  // Vérifier le cache
  if (cachedRepos.length > 0 && Date.now() - reposCacheTime < CACHE_DURATION) {
    return cachedRepos;
  }

  try {
    // Extraire le username depuis l'URL GitHub
    const username = githubUrl.replace(/\/$/, "").split("/").pop();
    if (!username) return cachedRepos;

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=public`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn(`[chat] GitHub API ${res.status}: ${res.statusText}`);
      return cachedRepos;
    }

    const repos: GitHubRepo[] = await res.json();
    cachedRepos = repos;
    reposCacheTime = Date.now();
    console.info(`[chat] ${repos.length} repos GitHub chargés pour le contexte`);
    return repos;
  } catch (err) {
    console.warn("[chat] Erreur fetch GitHub repos:", err);
    return cachedRepos;
  }
}

function formatGitHubRepos(repos: GitHubRepo[]): string {
  if (repos.length === 0) return "";

  const repoLines = repos
    .map((r) => {
      const parts = [`- **${r.name}**`];
      if (r.description) parts.push(`: ${r.description}`);
      if (r.language) parts.push(` [${r.language}]`);
      if (r.topics.length > 0) parts.push(` Tags: ${r.topics.join(", ")}`);
      if (r.stargazers_count > 0) parts.push(` ⭐${r.stargazers_count}`);
      if (r.homepage) parts.push(` | Demo: ${r.homepage}`);
      parts.push(` | ${r.html_url}`);
      return parts.join("");
    })
    .join("\n");

  return `\n\n=== REPOS GITHUB PUBLICS (${repos.length}) ===\n${repoLines}`;
}

/**
 * Construit le contexte du portfolio pour le system prompt de Gemini
 */
function buildPortfolioContext(data: Awaited<ReturnType<typeof getPortfolioData>>, githubRepos: GitHubRepo[]): string {
  const { settings, projects, securitySkills, skillCategories, profileCategories, terminalLines, certifications, technologies } = data;

  const projectsList = projects
    .map((p) => `- ${p.title}: ${p.subtitle}. ${p.description}. Stack: ${p.stack.join(", ")}. ${p.securityPoints.length > 0 ? `Sécurité: ${p.securityPoints.join(", ")}` : ""} GitHub: ${p.githubUrl}${p.liveUrl ? ` | Demo: ${p.liveUrl}` : ""}`)
    .join("\n");

  const securityList = securitySkills
    .map((s) => `- ${s.title}: ${s.description} Tags: ${s.tags.join(", ")}`)
    .join("\n");

  const skillsList = skillCategories
    .map((c) => `- ${c.icon} ${c.title}: ${c.items.join(", ")}`)
    .join("\n");

  const profileList = profileCategories
    .map((c) => `- ${c.icon} ${c.title}: ${c.points.join(", ")}`)
    .join("\n");

  const terminalInfo = terminalLines
    .map((l) => `${l.command} → ${l.output}`)
    .join("\n");

  const certList = certifications
    .map((c) => `- ${c.name} (${c.platform}, ${c.date}): ${c.description}`)
    .join("\n");

  const techList = technologies
    .map((t) => `- ${t.name} [${t.category}]`)
    .join("\n");

  return `
Tu es l'assistant IA du portfolio de Juvenal SINENG KENGNI (pseudo: SKJUV).
Tu dois répondre UNIQUEMENT aux questions liées à Juvenal, son parcours, ses compétences, ses projets et son profil professionnel.
Pour toute question hors-sujet (météo, politique, cuisine, sports, etc.), réponds poliment que tu ne peux répondre qu'aux questions sur le portfolio de Juvenal.

Réponds de manière naturelle, amicale et professionnelle. Utilise des emojis occasionnellement.
Réponds en français par défaut, sauf si l'utilisateur écrit en anglais.
Sois concis mais informatif. N'invente JAMAIS d'informations qui ne sont pas dans le contexte ci-dessous.

=== INFORMATIONS DU PORTFOLIO ===

Site: ${settings.siteTitle} — ${settings.siteDescription}
Contact: Email: ${settings.contactEmail} | GitHub: ${settings.contactGithub} | LinkedIn: ${settings.contactLinkedin}

Présentation:
${settings.heroTitle}
${settings.heroSubtitle}
${settings.heroDescription}

Terminal info:
${terminalInfo}

=== PROJETS (${projects.length}) ===
${projectsList}

=== COMPÉTENCES SÉCURITÉ (Passion #1) ===
${securityList}

=== COMPÉTENCES TECHNIQUES ===
${skillsList}

=== PROFIL & SYSTÈMES ===
${profileList}

=== TECHNOLOGIES MAÎTRISÉES (${technologies.length}) ===
${techList}

=== CERTIFICATIONS (${certifications.length}) ===
${certList || "Aucune certification listée pour le moment."}
${formatGitHubRepos(githubRepos)}
`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    // Limiter la longueur du message
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message trop long (max 1000 caractères)" }, { status: 400 });
    }

    // Vérifier que Gemini est configuré
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Gemini non configurée", fallback: true },
        { status: 503 }
      );
    }

    // Charger les données du portfolio + repos GitHub pour le contexte
    const data = await getPortfolioData();
    const githubRepos = await fetchGitHubRepos(data.settings.contactGithub);
    const systemContext = buildPortfolioContext(data, githubRepos);

    // Configurer Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Construire l'historique de conversation pour Gemini
    const chatHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Essayer chaque modèle jusqu'à ce qu'un fonctionne
    let lastError: unknown = null;
    for (const modelName of GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemContext,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response, model: modelName });
      } catch (err) {
        console.warn(`[chat] Modèle ${modelName} échoué:`, err instanceof Error ? err.message : err);
        lastError = err;
        // Continuer avec le modèle suivant
      }
    }

    // Tous les modèles ont échoué
    console.error("Tous les modèles Gemini ont échoué:", lastError);
    return NextResponse.json(
      { error: "Erreur du service IA", fallback: true },
      { status: 500 }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Erreur du service IA", fallback: true },
      { status: 500 }
    );
  }
}
