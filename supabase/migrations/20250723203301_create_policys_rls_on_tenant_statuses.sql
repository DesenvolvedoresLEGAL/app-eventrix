-- Migration: 20250723203301_create_policys_rls_on_tenant_statuses.sql
-- Descrição: Criação de políticas RLS para a tabela tenant_statuses
-- Tabela: tenant_statuses
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "tenant_statuses_read_all" ON tenant_statuses
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
-- COMMIT;

--ROLLBACK;
DROP POLICY "tenant_statuses_read_all" ON tenant_statuses;
COMMIT;