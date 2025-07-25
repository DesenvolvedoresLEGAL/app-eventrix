-- Migration: 20250725130928_comment_on_function_create_new_tenant.sql
-- Descrição: Adiciona comentário à função create_new_tenant
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION create_new_tenant IS 'Cria um novo tenant com todas as configurações necessárias';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION create_new_tenant IS NULL;
-- COMMIT;