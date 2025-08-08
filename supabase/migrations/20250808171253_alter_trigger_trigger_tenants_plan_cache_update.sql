-- Migration: 20250808171253_alter_trigger_trigger_tenants_plan_cache_update.sql
-- Descrição: Atualiza trigger para atualizar o cache do plano na tabela tenants para evitar loop infinito.
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Remove o trigger antigo se ele já existir, para garantir a recriação
DROP TRIGGER IF EXISTS trigger_tenants_plan_cache_update ON tenants;

-- Cria o trigger corrigido com a condição WHEN
CREATE TRIGGER trigger_tenants_plan_cache_update
    AFTER UPDATE OF plan_id ON tenants
    FOR EACH ROW
    WHEN (OLD.plan_id IS DISTINCT FROM NEW.plan_id) -- <<< ADICIONE ESTA CONDIÇÃO
    EXECUTE FUNCTION update_tenant_plan_cache();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_tenants_plan_cache_update;
-- COMMIT;