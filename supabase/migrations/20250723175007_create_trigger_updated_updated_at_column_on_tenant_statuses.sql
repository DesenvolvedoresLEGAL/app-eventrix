-- Migration: 20250723175007_create_trigger_updated_updated_at_column_on_tenant_statuses.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela tenant_statuses.
-- Tabela: tenant_statuses
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_tenant_statuses_updated_at
    BEFORE UPDATE ON tenant_statuses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_tenant_statuses_updated_at ON tenant_statuses;
-- COMMIT;