-- Migration: 20250807192229_apply_rls_to_business_segments.sql
-- Descrição: Aplica política de leitura pública na tabela 'business_segments'.
-- Tabela: public.business_segments
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Public Read-Only Access" ON public.business_segments
  FOR ALL USING (true) WITH CHECK (is_super_admin());

ALTER TABLE public.business_segments ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Public Read-Only Access" ON public.business_segments;
-- ALTER TABLE public.business_segments DISABLE ROW LEVEL SECURITY;
-- COMMIT;
