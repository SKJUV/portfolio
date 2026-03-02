-- ============================================
-- Script de reset / setup Supabase — Portfolio CMS
-- Idempotent : peut être exécuté plusieurs fois sans erreur
-- À coller dans Supabase > SQL Editor > New query > Run
-- ============================================

-- ============================================
-- 1. TABLE : portfolio_data
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_data (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_data_updated
  ON portfolio_data (updated_at);

-- Fonction auto-update timestamp (CREATE OR REPLACE = idempotent)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_data_updated ON portfolio_data;
CREATE TRIGGER portfolio_data_updated
  BEFORE UPDATE ON portfolio_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON portfolio_data;
CREATE POLICY "Public read access"
  ON portfolio_data FOR SELECT USING (true);

-- ============================================
-- 2. TABLE : page_views (analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL DEFAULT '/',
  referrer TEXT DEFAULT '',
  ip_hash TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at
  ON page_views (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_page_views_path
  ON page_views (path);

-- RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts" ON page_views;
CREATE POLICY "Allow anonymous inserts"
  ON page_views FOR INSERT WITH CHECK (true);

-- Pas de policy SELECT → seul le service_role (admin API) peut lire

-- ============================================
-- 3. STORAGE : bucket uploads
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read uploads" ON storage.objects;
CREATE POLICY "Public read uploads"
  ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- ============================================
-- 4. Forcer le rechargement du schema cache PostgREST
--    (nécessaire pour que la nouvelle table page_views
--     soit accessible via l'API REST immédiatement)
-- ============================================
NOTIFY pgrst, 'reload schema';
