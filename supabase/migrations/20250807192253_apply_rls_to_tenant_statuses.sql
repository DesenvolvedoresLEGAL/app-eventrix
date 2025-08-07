-- Migration: 20250807192253_apply_rls_to_tenant_statuses.sql
-- Descrição: Aplica política de leitura pública na tabela 'tenant_statuses'.
-- Tabela: public.tenant_statuses
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Public Read-Only Access" ON public.tenant_statuses
  FOR ALL USING (true) WITH CHECK (is_super_admin());

ALTER TABLE public.tenant_statuses ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Public Read-Only Access" ON public.tenant_statuses;
-- ALTER TABLE public.tenant_statuses DISABLE ROW LEVEL SECURITY;
-- COMMIT;
