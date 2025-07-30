-- Migration: 20250723202859_create_policys_rls_on_tenant_audit_log.sql
-- Descrição: Cria políticas de RLS para a tabela tenant_audit_log.
-- Tabela: tenant_audit_log
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Read-only access to audit logs for tenant admins
CREATE POLICY "tenant_audit_log_tenant_read" ON tenant_audit_log
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

-- Only system and super admins can insert audit logs
CREATE POLICY "tenant_audit_log_system_insert" ON tenant_audit_log
    FOR INSERT
    WITH CHECK (
        is_super_admin() OR
        get_current_user_role() = 'system'
    );
-- COMMIT;

--ROLLBACK;
DROP POLICY "tenant_audit_log_tenant_read" ON tenant_audit_log;
DROP POLICY "tenant_audit_log_system_insert" ON tenant_audit_log;
COMMIT;