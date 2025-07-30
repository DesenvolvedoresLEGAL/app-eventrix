-- Migration: 20250723201924_create_policies_rls_on_tenants.sql
-- Descrição: Criação de políticas RLS para a tabela de inquilinos
-- Tabela: tenants
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
-- Policy for tenants to view their own data
CREATE POLICY "tenants_select_own_data" ON tenants
    FOR SELECT
    USING (
        id = get_current_tenant_id() OR 
        is_super_admin()
    );

-- Policy for tenants to update their own data
CREATE POLICY "tenants_update_own_data" ON tenants
    FOR UPDATE
    USING (
        id = get_current_tenant_id() AND
        get_current_user_role() IN ('admin', 'owner')
    );

-- Policy for super admins to manage all tenants
CREATE POLICY "tenants_super_admin_all_access" ON tenants
    FOR ALL
    USING (is_super_admin());

-- Policy for tenant creation (only super admins or during registration)
CREATE POLICY "tenants_insert_registration" ON tenants
    FOR INSERT
    WITH CHECK (
        is_super_admin() OR
        get_current_user_role() = 'registration'
    );
-- COMMIT;

--ROLLBACK;
DROP POLICY IF EXISTS tenants_select_own_data ON tenants;
DROP POLICY IF EXISTS tenants_update_own_data ON tenants;
DROP POLICY IF EXISTS tenants_super_admin_all_access ON tenants;
DROP POLICY IF EXISTS tenants_insert_registration ON tenants;
COMMIT;