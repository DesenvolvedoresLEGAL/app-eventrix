-- Migration: 20250723175005_create_trigger_updated_updated_at_column_on_subscription_plans.sql
-- Descrição: Cria trigger para atualizar a coluna updated_at na tabela subscription_plans.
-- Tabela: subscription_plans
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE TRIGGER trigger_subscription_plans_updated_at
    BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP TRIGGER IF EXISTS trigger_subscription_plans_updated_at ON subscription_plans;
-- COMMIT;