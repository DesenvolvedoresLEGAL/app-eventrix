-- Migration: 20250807122937_alter_table_user_roles_add_permissions.sql
-- Table: user_roles
-- Description: Adds missing permissions column to user_roles
-- Author: Gustavo Mota
-- Date: 2025-08-07

BEGIN;
ALTER TABLE public.user_roles
  ADD COLUMN permissions jsonb NOT NULL DEFAULT '{}';
COMMIT;

-- ROLLBACK
-- BEGIN;
-- ALTER TABLE public.user_roles DROP COLUMN permissions;
-- COMMIT;
