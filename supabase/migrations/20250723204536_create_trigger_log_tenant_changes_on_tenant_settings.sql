-- Migration: 20250723204536_create_trigger_log_tenant_changes_on_tenant_settings.sql
-- Descrição: Criação do trigger de log de alterações de configurações de inquilinos
-- Tabela: tenant_settings
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_audit_tenant_settings
    AFTER INSERT OR UPDATE OR DELETE ON tenant_settings
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();
COMMIT;

--ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_audit_tenant_settings ON tenant_settings;
-- COMMIT;