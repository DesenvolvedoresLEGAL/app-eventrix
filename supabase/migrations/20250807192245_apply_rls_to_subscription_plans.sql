-- Migration: 20250807192245_apply_rls_to_subscription_plans.sql
-- Descrição: Aplica política de leitura pública na tabela 'subscription_plans'.
-- Tabela: public.subscription_plans
-- Autor: Gustavo Mota
-- Data: 07/08/2025

BEGIN;

CREATE POLICY "Public Read-Only Access" ON public.subscription_plans
  FOR ALL USING (true) WITH CHECK (is_super_admin());

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

COMMIT;

--ROLLBACK;
-- BEGIN;
-- DROP POLICY IF EXISTS "Public Read-Only Access" ON public.subscription_plans;
-- ALTER TABLE public.subscription_plans DISABLE ROW LEVEL SECURITY;
-- COMMIT;
