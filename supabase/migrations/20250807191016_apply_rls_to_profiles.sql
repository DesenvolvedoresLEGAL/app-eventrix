-- Migration: 20250807191016_apply_rls_to_profiles.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'profiles'.
-- Tabela: public.profiles
-- Autor: Gemini
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.profiles
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.profiles;
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
-- COMMIT;
