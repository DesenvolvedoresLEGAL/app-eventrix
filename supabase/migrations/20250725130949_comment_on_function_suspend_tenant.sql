-- Migration: 20250725130949_comment_on_function_suspend_tenant.sql
-- Descrição: Adiciona comentário à função suspend_tenant
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION suspend_tenant IS 'Suspende um tenant e registra o motivo';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION suspend_tenant IS NULL;
-- COMMIT;