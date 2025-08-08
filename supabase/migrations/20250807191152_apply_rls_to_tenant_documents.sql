-- Migration: 20250807191152_apply_rls_to_tenant_documents.sql
-- Descrição: Aplica a política de isolamento por tenant na tabela 'tenant_documents'.
-- Tabela: public.tenant_documents
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Tenant Isolation Policy" ON public.tenant_documents
  FOR ALL USING (is_super_admin() OR tenant_id = get_my_tenant_id())
  WITH CHECK (is_super_admin() OR tenant_id = get_my_tenant_id());

ALTER TABLE public.tenant_documents ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Tenant Isolation Policy" ON public.tenant_documents;
-- ALTER TABLE public.tenant_documents DISABLE ROW LEVEL SECURITY;
-- COMMIT;
