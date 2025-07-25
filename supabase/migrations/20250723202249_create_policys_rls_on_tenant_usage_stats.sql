-- Migration: 20250723202249_create_policys_rls_on_tenant_usage_stats
-- Descrição: Implementação de políticas RLS para a tabela tenant_usage_stats
-- Tabela: tenant_usage_stats
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "tenant_usage_stats_tenant_access" ON tenant_usage_stats
    FOR ALL
    USING (
        tenant_id = get_current_tenant_id() OR
        is_super_admin()
    );
COMMIT;

--ROLLBACK;
-- DROP POLICY IF EXISTS "tenant_usage_stats_tenant_access" ON tenant_usage_stats;
-- COMMIT;