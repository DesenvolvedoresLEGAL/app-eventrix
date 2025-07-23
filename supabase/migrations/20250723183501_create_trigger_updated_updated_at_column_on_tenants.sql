-- Migration: 20250723183501_create_trigger_updated_updated_at_column_on_tenants.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela tenants.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Create trigger for updated_at
CREATE TRIGGER trigger_tenants_updated_at
    BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS trigger_tenants_updated_at;
-- COMMIT;