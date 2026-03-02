-- ===================================================
-- Table page_views — Analytics maison pour le portfolio
-- À exécuter dans l'éditeur SQL de Supabase
-- ===================================================

CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL DEFAULT '/',
  referrer TEXT DEFAULT '',
  ip_hash TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour les requêtes d'agrégation par date
CREATE INDEX IF NOT EXISTS idx_page_views_created_at 
  ON page_views (created_at DESC);

-- Index pour le comptage par path
CREATE INDEX IF NOT EXISTS idx_page_views_path 
  ON page_views (path);

-- Activer RLS (Row Level Security) 
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Politique : insertion anonyme autorisée (tracking des visiteurs)
CREATE POLICY "Allow anonymous inserts" ON page_views
  FOR INSERT
  WITH CHECK (true);

-- Politique : lecture uniquement via service_role (API admin)
-- Le service_role bypass automatiquement les policies RLS,
-- donc les lectures depuis l'API admin fonctionneront.
-- Les utilisateurs anonymes ne peuvent PAS lire les données.

-- Nettoyage automatique des anciennes données (optionnel)
-- Supprime les entrées de plus de 90 jours
-- À lancer via un cron Supabase ou manuellement
-- DELETE FROM page_views WHERE created_at < NOW() - INTERVAL '90 days';
