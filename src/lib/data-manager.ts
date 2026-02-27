import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./admin-types";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio-data.json");

/**
 * Lire toutes les données du portfolio depuis le fichier JSON
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

/**
 * Écrire toutes les données du portfolio dans le fichier JSON
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Mettre à jour partiellement les données du portfolio
 */
export async function updatePortfolioData(
  updater: (data: PortfolioData) => PortfolioData
): Promise<PortfolioData> {
  const data = await getPortfolioData();
  const updated = updater(data);
  await savePortfolioData(updated);
  return updated;
}
