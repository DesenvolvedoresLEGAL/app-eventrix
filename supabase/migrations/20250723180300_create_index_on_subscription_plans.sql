-- Migration: 20250723180300_create_index_on_subscription_plans.sql
-- Descrição: Cria indices na tabela subscription_plans.
-- Tabela: subscription_plans
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE INDEX idx_subscription_plans_code ON subscription_plans(code);
CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active, sort_order);
CREATE INDEX idx_subscription_plans_popular ON subscription_plans(is_popular) WHERE is_popular = true;
COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP INDEX IF EXISTS idx_subscription_plans_code;
-- DROP INDEX IF EXISTS idx_subscription_plans_active;
-- DROP INDEX IF EXISTS idx_subscription_plans_popular;
-- COMMIT;