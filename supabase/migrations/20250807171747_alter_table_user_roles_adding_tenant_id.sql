-- Migration: 20250807171747_alter_table_user_roles_adding_tenant_id.sql
-- Table: user_roles
-- Description: Adds missing tenant_id column to user_roles. The null value is used to global roles.
-- Author: Gustavo Mota
-- Date: 2025-08-07

BEGIN;
ALTER TABLE public.user_roles
  ADD COLUMN tenant_id uuid NULL;
ALTER TABLE public.user_roles
  ADD CONSTRAINT fk_user_roles_tenant
    FOREIGN KEY (tenant_id)
    REFERENCES public.tenants(id);
COMMIT;

-- ROLLBACK
-- ALTER TABLE public.user_roles DROP CONSTRAINT fk_user_roles_tenant;
-- ALTER TABLE public.user_roles DROP COLUMN tenant_id;
-- COMMIT;
