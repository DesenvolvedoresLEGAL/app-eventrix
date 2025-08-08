-- Migration: 20250807192238_apply_rls_to_organizer_types.sql
-- Descrição: Aplica política de leitura pública na tabela 'organizer_types'.
-- Tabela: public.organizer_types
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Public Read-Only Access" ON public.organizer_types
  FOR ALL USING (true) WITH CHECK (is_super_admin());

ALTER TABLE public.organizer_types ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Public Read-Only Access" ON public.organizer_types;
-- ALTER TABLE public.organizer_types DISABLE ROW LEVEL SECURITY;
-- COMMIT;
