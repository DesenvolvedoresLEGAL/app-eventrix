-- Migration: 20250724203535_comment_on_tenants_policies.sql
-- Descrição: Adiciona comentários nas políticas de acesso da tabela tenants
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 24/07/2025

BEGIN;
-- COMMENT ON POLICY "tenants_select_own_data" ON tenants IS 'Permite que tenants vejam apenas seus próprios dados';
-- COMMENT ON POLICY "tenants_super_admin_all_access" ON tenants IS 'Super administradores têm acesso total';
COMMIT;

--ROLLBACK;
-- COMMENT ON POLICY "tenants_select_own_data" ON tenants IS NULL;
-- COMMENT ON POLICY "tenants_super_admin_all_access" ON tenants IS NULL;
-- COMMIT;