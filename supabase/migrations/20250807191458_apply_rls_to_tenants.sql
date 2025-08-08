-- Migration: 20250807191458_apply_rls_to_tenants.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenants'.
-- Tabela: public.tenants
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

-- A tabela 'tenants' é um caso especial, pois a coluna de identificação é 'id'.
CREATE POLICY "Tenant Isolation Policy" ON public.tenants
  FOR ALL USING (is_super_admin() OR id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR id = get_my_tenant_id());

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenants;
-- ALTER TABLE public.tenants DISABLE ROW LEVEL SECURITY;
-- COMMIT;
