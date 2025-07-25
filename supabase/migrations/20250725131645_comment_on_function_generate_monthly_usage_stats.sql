-- Migration: 20250725131645_comment_on_function_generate_monthly_usage_stats.sql
-- Descrição: Adiciona comentário à função generate_monthly_usage_stats
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION generate_monthly_usage_stats IS 'Gera estatísticas mensais de uso para todos os tenants';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION generate_monthly_usage_stats IS NULL;
-- COMMIT;
