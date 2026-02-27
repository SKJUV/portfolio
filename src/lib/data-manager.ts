import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./admin-types";
import { supabaseAdmin, isSupabaseConfigured } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio-data.json");

// ============================================
// Supabase storage (production / Vercel)
// ============================================

async function getDataFromSupabase(): Promise<PortfolioData | null> {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("portfolio_data")
    .select("data")
    .eq("id", 1)
    .single();
  if (error || !data) return null;
  return data.data as PortfolioData;
}

async function saveDataToSupabase(portfolioData: PortfolioData): Promise<void> {
  if (!supabaseAdmin) throw new Error("Supabase non configuré");
  const { error } = await supabaseAdmin
    .from("portfolio_data")
    .upsert({ id: 1, data: portfolioData, updated_at: new Date().toISOString() });
  if (error) throw new Error(`Supabase write error: ${error.message}`);
}

// ============================================
// Local JSON storage (développement)
// ============================================

async function getDataFromFile(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
  return JSON.parse(raw) as PortfolioData;
}

async function saveDataToFile(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ============================================
// API publique — choisit automatiquement
// Supabase si configuré, sinon fichier local
// ============================================

/**
 * Lire toutes les données du portfolio
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  if (isSupabaseConfigured()) {
    const data = await getDataFromSupabase();
    if (data) return data;
    // Fallback : si la table est vide, lire le JSON local et seeder
    console.warn("[data-manager] Supabase vide, seed depuis le JSON local...");
    const localData = await getDataFromFile();
    await saveDataToSupabase(localData);
    return localData;
  }
  return getDataFromFile();
}

/**
 * Écrire toutes les données du portfolio
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (isSupabaseConfigured()) {
    await saveDataToSupabase(data);
    return;
  }
  await saveDataToFile(data);
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
