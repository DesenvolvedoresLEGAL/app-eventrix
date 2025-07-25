-- Migration: 20250725131014_comment_on_function_cleanup_old_audit_logs.sql
-- Descrição: Adiciona comentário à função cleanup_old_audit_logs
-- Tabela: cleanup_old_audit_logs
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
COMMENT ON FUNCTION cleanup_old_audit_logs IS 'Remove logs de auditoria antigos para compliance LGPD';
COMMIT;

--ROLLBACK;
-- COMMENT ON FUNCTION cleanup_old_audit_logs IS NULL;
-- COMMIT;