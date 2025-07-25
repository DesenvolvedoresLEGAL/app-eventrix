-- Migration: 20250725130942_comment_on_function_change_tenant_plan.sql
-- Descrição: Adiciona comentário à função change_tenant_plan
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION change_tenant_plan IS 'Altera o plano de um tenant e registra no histórico';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION change_tenant_plan IS NULL;
-- COMMIT;