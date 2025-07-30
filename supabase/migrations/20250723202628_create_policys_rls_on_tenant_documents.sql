-- Migration: 20250723202628_create_policys_rls_on_tenant_documents.sql
-- Descrição: Cria políticas de RLS para a tabela tenant_documents.
-- Tabela: tenant_documents
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "tenant_documents_tenant_access" ON tenant_documents
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_documents_admin_modify" ON tenant_documents
    FOR ALL
    USING (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );
-- COMMIT;

--ROLLBACK;
DROP POLICY "tenant_documents_tenant_access" ON tenant_documents;
DROP POLICY "tenant_documents_admin_modify" ON tenant_documents;
COMMIT;