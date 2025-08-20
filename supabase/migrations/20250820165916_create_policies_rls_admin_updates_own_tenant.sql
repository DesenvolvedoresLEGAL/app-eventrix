-- Migration: 20250820165916_create_policies_rls_admin_updates_own_tenant.sql
-- Table: public.tenants
-- Description: Enable RLS update policy for admin users on tenants table
-- Author: Gustavo Macedo
-- Date: 2025-08-20

BEGIN;

-- Garantir que RLS está habilitado
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Criar política: apenas admins podem atualizar, e apenas se forem do mesmo tenant
CREATE POLICY "Enable update for authenticated admin users only" 
ON public.tenants FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid()
          AND p.tenant_id = tenants.id
    )
)
WITH CHECK (
    get_current_user_role() = 'admin'
);

COMMIT;

-- ROLLBACK
-- DROP POLICY IF EXISTS "Enable update for authenticated admin users only" ON public.tenants;
-- COMMIT;