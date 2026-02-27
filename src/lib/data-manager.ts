import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./admin-types";
import { supabaseAdmin, isSupabaseConfigured } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio-data.json");

// Cache pour éviter de retenter Supabase à chaque requête quand il échoue
let supabaseAvailable: boolean | null = null; // null = pas encore testé

function shouldUseSupabase(): boolean {
  if (!isSupabaseConfigured()) return false;
  if (supabaseAvailable === false) return false; // déjà échoué
  return true;
}

// ============================================
// Supabase storage (production / Vercel)
// ============================================

async function getDataFromSupabase(): Promise<PortfolioData | null> {
  if (!supabaseAdmin) return null;
  try {
    const { data, error } = await supabaseAdmin
      .from("portfolio_data")
      .select("data")
      .eq("id", 1)
      .single();
    if (error || !data) return null;
    supabaseAvailable = true;
    return data.data as PortfolioData;
  } catch {
    supabaseAvailable = false;
    return null;
  }
}

async function saveDataToSupabase(portfolioData: PortfolioData): Promise<void> {
  if (!supabaseAdmin) throw new Error("Supabase non configuré");
  const { error } = await supabaseAdmin
    .from("portfolio_data")
    .upsert({ id: 1, data: portfolioData, updated_at: new Date().toISOString() });
  if (error) {
    supabaseAvailable = false;
    throw new Error(`Supabase write error: ${error.message}`);
  }
  supabaseAvailable = true;
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
// Supabase si configuré et accessible, sinon fichier local
// ============================================

/**
 * Lire toutes les données du portfolio
 * Stratégie : Supabase si disponible, sinon JSON local
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  if (shouldUseSupabase()) {
    try {
      const data = await getDataFromSupabase();
      if (data) return data;
      // Table vide → seeder depuis le JSON local
      if (supabaseAvailable !== false) {
        console.info("[data-manager] Supabase vide, seed depuis le JSON local...");
        const localData = await getDataFromFile();
        try {
          await saveDataToSupabase(localData);
        } catch {
          // seed échoué, pas grave, on a le local
        }
        return localData;
      }
    } catch {
      // Supabase inaccessible → marquer et fallback
      supabaseAvailable = false;
    }
  }
  return getDataFromFile();
}

/**
 * Écrire toutes les données du portfolio
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (shouldUseSupabase()) {
    try {
      await saveDataToSupabase(data);
      return;
    } catch {
      // Supabase échoué → fallback local
    }
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
