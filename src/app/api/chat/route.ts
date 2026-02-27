import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPortfolioData } from "@/lib/data-manager";
import githubReposData from "@/data/github-repos.json";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Modèles à essayer dans l'ordre (le premier disponible sera utilisé)
const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];

// ============================================
// Repos GitHub chargés depuis le JSON local enrichi
// ============================================
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
  created_at: string;
  updated_at: string;
  default_branch: string;
  is_fork: boolean;
  readme: string | null;
}

function getGitHubRepos(): GitHubRepo[] {
  return githubReposData as unknown as GitHubRepo[];
}

function formatGitHubRepos(repos: GitHubRepo[]): string {
  if (repos.length === 0) return "";

  const repoLines = repos
    .map((r) => {
      const parts = [`### ${r.name}`];
      if (r.description) parts.push(`Description: ${r.description}`);
      if (r.language) parts.push(`Langage principal: ${r.language}`);
      const langs = Object.keys(r.languages);
      if (langs.length > 1) parts.push(`Stack: ${langs.join(", ")}`);
      if (r.topics.length > 0) parts.push(`Tags: ${r.topics.join(", ")}`);
      if (r.stars > 0) parts.push(`⭐ ${r.stars} stars`);
      if (r.forks > 0) parts.push(`🍴 ${r.forks} forks`);
      if (r.homepage) parts.push(`Demo: ${r.homepage}`);
      parts.push(`URL: ${r.url}`);
      if (r.readme && r.readme.length > 20 && !r.readme.includes("\u0000")) {
        // Inclure un extrait du README nettoyé (max 500 chars)
        const cleanReadme = r.readme.replace(/[#*`\-=|]/g, "").replace(/\n{3,}/g, "\n\n").trim();
        if (cleanReadme.length > 20) {
          parts.push(`README (extrait): ${cleanReadme.substring(0, 500)}${cleanReadme.length > 500 ? "..." : ""}`);
        }
      }
      return parts.join("\n");
    })
    .join("\n\n");

  return `\n\n=== REPOS GITHUB PUBLICS (${repos.length}) ===
Voici TOUS les repos publics de Juvenal sur GitHub. Utilise ces informations pour répondre aux questions sur ses projets, technologies et activité GitHub.\n\n${repoLines}`;
}

/**
 * Construit le contexte du portfolio pour le system prompt de Gemini
 */
function buildPortfolioContext(data: Awaited<ReturnType<typeof getPortfolioData>>): string {
  const githubRepos = getGitHubRepos();
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

    // Charger les données du portfolio pour le contexte
    const data = await getPortfolioData();
    const systemContext = buildPortfolioContext(data);

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
            maxOutputTokens: 2048,
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
