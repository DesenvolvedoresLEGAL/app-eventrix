-- Migration: 20250723184135_create_trigger_trigger_tenants_plan_cache_update_on_tenants.sql
-- Descrição: Cria trigger para atualizar o cache do plano na tabela tenants.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Create trigger for plan cache updates
CREATE TRIGGER trigger_tenants_plan_cache_update
    AFTER UPDATE OF plan_id ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_tenant_plan_cache();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_tenants_plan_cache_update;
-- COMMIT;