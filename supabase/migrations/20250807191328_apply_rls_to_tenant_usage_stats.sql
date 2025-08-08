-- Migration: 20250807191328_apply_rls_to_tenant_usage_stats.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenant_usage_stats'.
-- Tabela: public.tenant_usage_stats
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.tenant_usage_stats
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.tenant_usage_stats ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenant_usage_stats;
-- ALTER TABLE public.tenant_usage_stats DISABLE ROW LEVEL SECURITY;
-- COMMIT;
