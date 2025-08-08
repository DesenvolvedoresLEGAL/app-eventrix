-- Migration: 20250807192201_apply_rls_to_brazilian_states.sql
-- Descrição: Aplica política de leitura pública na tabela 'brazilian_states'.
-- Tabela: public.brazilian_states
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Public Read-Only Access" ON public.brazilian_states
  FOR ALL USING (true) WITH CHECK (is_super_admin());

ALTER TABLE public.brazilian_states ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Public Read-Only Access" ON public.brazilian_states;
-- ALTER TABLE public.brazilian_states DISABLE ROW LEVEL SECURITY;
-- COMMIT;
