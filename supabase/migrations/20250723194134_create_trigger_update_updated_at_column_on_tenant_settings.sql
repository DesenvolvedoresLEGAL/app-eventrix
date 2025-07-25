-- Migration: 20250723194134_create_trigger_update_updated_at_column_on_tenant_settings.sql
-- Descrição: Cria um gatilho para atualizar a coluna updated_at na tabela tenant_settings.
-- Tabela: tenant_settings
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_tenant_settings_updated_at
    BEFORE UPDATE ON tenant_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_tenant_settings_updated_at ON tenant_settings;
-- COMMIT;