-- Migration: 20250805141348_alter_table_profiles_add_role_column.sql
-- Table: profiles
-- Description: Altera valor default da coluna role em profiles
-- Author: Gustavo Mota
-- Date: 2025-08-08

BEGIN;
ALTER TABLE profiles ALTER COLUMN role SET DEFAULT '7b2118cf-d775-4b2c-8031-c4906d10d6f2';
COMMIT;

-- ROLLBACK
-- ALTER TABLE public.profiles
--   DROP COLUMN role;
-- COMMIT;