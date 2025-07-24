-- Migration: 20250724203547_comment_on_tenants_related_functions.sql
-- Descrição: Adiciona comentários nas funções relacionadas a tenants
-- Tabela: N/A
-- Autor: Gustavo Mota
-- Data: 24/07/2025

BEGIN;
COMMENT ON FUNCTION get_current_tenant_id() IS 'Extrai tenant_id do JWT token';
COMMENT ON FUNCTION is_super_admin() IS 'Verifica se o usuário atual é super administrador';
COMMENT ON FUNCTION log_tenant_changes() IS 'Registra mudanças para auditoria e compliance LGPD';
COMMIT;

--ROLLBACK;
COMMENT ON FUNCTION get_current_tenant_id() IS NULL;
COMMENT ON FUNCTION is_super_admin() IS NULL;
COMMENT ON FUNCTION log_tenant_changes() IS NULL;
-- COMMIT;