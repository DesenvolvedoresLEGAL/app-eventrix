-- Migration: 20250723202459_create_policys_rls_on_tenant_settings
-- Descrição: Implementação de políticas RLS para a tabela tenant_settings
-- Tabela: tenant_settings
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "tenant_settings_tenant_access" ON tenant_settings
    FOR SELECT
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );

CREATE POLICY "tenant_settings_admin_modify" ON tenant_settings
    FOR ALL
    USING (
        (tenant_id = get_current_tenant_id() AND 
         get_current_user_role() IN ('admin', 'owner')) OR
        is_super_admin()
    );
COMMIT;

--ROLLBACK;
-- DROP POLICY IF EXISTS tenant_settings_tenant_access ON tenant_settings;
-- DROP POLICY IF EXISTS tenant_settings_admin_modify ON tenant_settings;
-- COMMIT;