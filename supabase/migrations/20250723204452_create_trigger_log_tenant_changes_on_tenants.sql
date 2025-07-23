-- Migration: 20250723204452_create_trigger_log_tenant_changes_on_tenants.sql
-- Descrição: Criação do trigger de log de alterações de inquilinos
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_audit_tenants
    AFTER INSERT OR UPDATE OR DELETE ON tenants
    FOR EACH ROW EXECUTE FUNCTION log_tenant_changes();
COMMIT;

--ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_audit_tenants ON tenants;
-- COMMIT;