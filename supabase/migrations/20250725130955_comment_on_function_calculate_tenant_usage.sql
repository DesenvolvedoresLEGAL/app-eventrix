-- Migration: 20250725130955_comment_on_function_calculate_tenant_usage.sql
-- Descrição: Adiciona comentário à função calculate_tenant_usage
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION calculate_tenant_usage IS 'Calcula estatísticas de uso do tenant no mês atual';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION calculate_tenant_usage IS NULL;
-- COMMIT;