-- Migration: 20250723203106_create_policys_rls_on_tenant_plan_history.sql
-- Descrição: Cria políticas de RLS para a tabela tenant_plan_history.
-- Tabela: tenant_plan_history
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "tenant_plan_history_tenant_read" ON tenant_plan_history
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_plan_history_admin_insert" ON tenant_plan_history
    FOR INSERT
    WITH CHECK (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );
COMMIT;

--ROLLBACK;
-- DROP POLICY "tenant_plan_history_tenant_read" ON tenant_plan_history;
-- DROP POLICY "tenant_plan_history_admin_insert" ON tenant_plan_history;
-- COMMIT;