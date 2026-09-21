import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./admin-types";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio-data.json");
const MESSAGES_FILE_PATH = path.join(process.cwd(), "src/data/messages.json");

let cachedData: PortfolioData | null = null;

export async function getPortfolioData(): Promise<PortfolioData> {
  if (cachedData) return cachedData;

  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    cachedData = JSON.parse(raw);
    return cachedData!;
  } catch (error) {
    console.error("[data-manager] Failed to read portfolio-data.json:", error);
    // Return empty fallback structure
    return {
      settings: {
        siteTitle: "SINENG KENGNI Juvenal",
        siteDescription: "Cybersecurity & Full-Stack",
        heroTitle: "SINENG KENGNI Juvenal",
        heroSubtitle: "Cybersecurity & Full-Stack",
        contactEmail: "sinengjuvenal@gmail.com",
        contactGithub: "https://github.com/SKJUV",
        contactLinkedin: "https://cm.linkedin.com/in/juvenal-sineng-kengni",
      },
      sections: [],
      projects: [],
      securitySkills: [],
      skillCategories: [],
      profileCategories: [],
      certifications: [],
      technologies: [],
      terminalLines: [],
      messages: [],
    } as unknown as PortfolioData;
  }
}

export async function updatePortfolioData(
  updater: (data: PortfolioData) => PortfolioData | Promise<PortfolioData>
): Promise<PortfolioData> {
  const current = await getPortfolioData();
  const updated = await updater(current);
  cachedData = updated;

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("[data-manager] Could not write to disk (likely read-only serverless):", err);
  }

  return updated;
}

export async function getContactMessages(): Promise<Array<Record<string, unknown>>> {
  try {
    const raw = await fs.readFile(MESSAGES_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
