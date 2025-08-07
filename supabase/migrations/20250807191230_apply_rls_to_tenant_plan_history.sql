-- Migration: 20250807191230_apply_rls_to_tenant_plan_history.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenant_plan_history'.
-- Tabela: public.tenant_plan_history
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.tenant_plan_history
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.tenant_plan_history ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenant_plan_history;
-- ALTER TABLE public.tenant_plan_history DISABLE ROW LEVEL SECURITY;
-- COMMIT;
