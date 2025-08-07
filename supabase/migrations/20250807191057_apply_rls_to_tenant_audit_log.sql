-- Migration: 20250807191057_apply_rls_to_tenant_audit_log.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenant_audit_log'.
-- Tabela: public.tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.tenant_audit_log
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.tenant_audit_log ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenant_audit_log;
-- ALTER TABLE public.tenant_audit_log DISABLE ROW LEVEL SECURITY;
-- COMMIT;
