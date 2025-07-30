-- Migration: 20250723203258_create_policys_rls_on_subscription_plans.sql
-- Descrição: Criação de políticas RLS para a tabela subscription_plans
-- Tabela: subscription_plans
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
CREATE POLICY "subscription_plans_read_all" ON subscription_plans
    FOR SELECT
    USING (auth.uid() IS NOT NULL);
-- COMMIT;

--ROLLBACK;
DROP POLICY "subscription_plans_read_all" ON subscription_plans;
COMMIT;