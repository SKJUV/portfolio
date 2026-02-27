-- ============================================
-- Schéma Supabase pour le Portfolio CMS
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- Table principale : stocke toutes les données du portfolio en JSONB
-- On utilise un document unique (id=1) pour simplifier la migration
CREATE TABLE IF NOT EXISTS portfolio_data (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Index pour la performance
CREATE INDEX IF NOT EXISTS idx_portfolio_data_updated
  ON portfolio_data (updated_at);

-- Trigger pour auto-update du timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER portfolio_data_updated
  BEFORE UPDATE ON portfolio_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Policy : lecture publique (pour le portfolio public)
CREATE POLICY "Public read access"
  ON portfolio_data
  FOR SELECT
  USING (true);

-- Policy : écriture via service_role uniquement (bypasse RLS)
-- Le service_role key bypasse automatiquement les policies
-- Donc pas besoin de policy INSERT/UPDATE/DELETE explicite

-- ============================================
-- Bucket Storage pour les uploads d'images
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Policy : lecture publique des images
CREATE POLICY "Public read uploads"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'uploads');

-- Policy : upload via service_role (automatique avec service_role key)
