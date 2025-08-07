-- Migration: 20250807191416_apply_rls_to_user_roles.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'user_roles'.
-- Tabela: public.user_roles
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.user_roles
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.user_roles;
-- ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;
-- COMMIT;
