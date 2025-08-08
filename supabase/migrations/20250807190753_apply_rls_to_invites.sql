-- Migration: 20250807190753_apply_rls_to_invites.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'invites'.
-- Tabela: public.invites
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.invites
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.invites;
-- ALTER TABLE public.invites DISABLE ROW LEVEL SECURITY;
-- COMMIT;
