-- Migration: 20250807191257_apply_rls_to_tenant_settings.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenant_settings'.
-- Tabela: public.tenant_settings
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.tenant_settings
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenant_settings;
-- ALTER TABLE public.tenant_settings DISABLE ROW LEVEL SECURITY;
-- COMMIT;
