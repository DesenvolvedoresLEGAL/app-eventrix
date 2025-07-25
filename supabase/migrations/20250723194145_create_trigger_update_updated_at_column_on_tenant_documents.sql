-- Migration: 20250723194145_create_trigger_update_updated_at_column_on_tenant_documents.sql
-- Descrição: Cria um gatilho para atualizar a coluna updated_at na tabela tenant_documents.
-- Tabela: tenant_documents
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_tenant_documents_updated_at
    BEFORE UPDATE ON tenant_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- DROP TRIGGER IF EXISTS trigger_tenant_documents_updated_at ON tenant_documents;
-- COMMIT;